"""
Framify Backend — Google OAuth handler
Handles the Google OAuth flow:
  1. Frontend redirects user to Google consent screen
  2. Google redirects back with an authorization code
  3. Backend exchanges code for user info
  4. Backend creates/finds user in MongoDB and returns a JWT
"""

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import get_settings
from app.db.mongodb import users_collection
from app.auth.jwt_handler import create_access_token
from datetime import datetime, timezone

router = APIRouter(prefix="/auth", tags=["Auth"])
settings = get_settings()

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


class GoogleCodeRequest(BaseModel):
    code: str
    redirect_uri: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


@router.post("/google", response_model=AuthResponse)
async def google_auth(payload: GoogleCodeRequest):
    """Exchange Google authorization code for user info and JWT."""

    # Exchange code for tokens
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": payload.code,
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "redirect_uri": payload.redirect_uri,
                "grant_type": "authorization_code",
            },
        )

    if token_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to exchange Google code")

    tokens = token_resp.json()
    access_token = tokens.get("access_token")

    if not access_token:
        raise HTTPException(status_code=400, detail="No access token from Google")

    # Get user info from Google
    async with httpx.AsyncClient() as client:
        userinfo_resp = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"},
        )

    if userinfo_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch Google user info")

    google_user = userinfo_resp.json()
    email = google_user.get("email")
    name = google_user.get("name", "")
    picture = google_user.get("picture", "")
    google_id = google_user.get("id")

    # Find or create user in MongoDB
    existing_user = await users_collection.find_one({"email": email})

    if existing_user:
        # Update last login
        await users_collection.update_one(
            {"_id": existing_user["_id"]},
            {"$set": {"last_login": datetime.now(timezone.utc), "picture": picture}},
        )
        user_id = str(existing_user["_id"])
    else:
        # Create new user
        new_user = {
            "email": email,
            "name": name,
            "picture": picture,
            "provider": "google",
            "provider_id": google_id,
            "created_at": datetime.now(timezone.utc),
            "last_login": datetime.now(timezone.utc),
        }
        result = await users_collection.insert_one(new_user)
        user_id = str(result.inserted_id)

    # Create JWT
    jwt_token = create_access_token({"sub": user_id, "email": email, "name": name})

    return AuthResponse(
        access_token=jwt_token,
        user={"id": user_id, "email": email, "name": name, "picture": picture},
    )


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
async def email_login(payload: LoginRequest):
    """Email/password login — placeholder for future implementation."""
    # For now, return a placeholder response
    # Full implementation would check hashed password in MongoDB
    user = await users_collection.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = str(user["_id"])
    jwt_token = create_access_token(
        {"sub": user_id, "email": user["email"], "name": user.get("name", "")}
    )
    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user["email"],
            "name": user.get("name", ""),
            "picture": user.get("picture", ""),
        },
    }


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


@router.post("/signup")
async def email_signup(payload: SignupRequest):
    """Email/password signup — creates a new user in MongoDB."""
    from passlib.hash import bcrypt

    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed = bcrypt.hash(payload.password)
    new_user = {
        "email": payload.email,
        "name": payload.name,
        "password_hash": hashed,
        "provider": "email",
        "picture": "",
        "created_at": datetime.now(timezone.utc),
        "last_login": datetime.now(timezone.utc),
    }
    result = await users_collection.insert_one(new_user)
    user_id = str(result.inserted_id)

    jwt_token = create_access_token(
        {"sub": user_id, "email": payload.email, "name": payload.name}
    )
    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": {"id": user_id, "email": payload.email, "name": payload.name},
    }


@router.get("/me")
async def get_me(user: dict = __import__("fastapi").Depends(
    __import__("app.auth.jwt_handler", fromlist=["require_auth"]).require_auth
)):
    """Get current authenticated user profile."""
    from bson import ObjectId

    db_user = await users_collection.find_one({"_id": ObjectId(user["sub"])})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": str(db_user["_id"]),
        "email": db_user["email"],
        "name": db_user.get("name", ""),
        "picture": db_user.get("picture", ""),
        "provider": db_user.get("provider", ""),
        "created_at": db_user.get("created_at", ""),
    }
