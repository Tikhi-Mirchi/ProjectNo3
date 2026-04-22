"""
Framify Backend — JWT utilities
Creates and verifies JWT tokens for authenticated sessions
"""

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import get_settings

security = HTTPBearer(auto_error=False)
settings = get_settings()


def create_access_token(data: dict) -> str:
    """Create a new JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=settings.jwt_expiry_hours)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def verify_token(token: str) -> dict:
    """Verify and decode a JWT token."""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> dict | None:
    """Extract user from bearer token. Returns None if no token provided (guest mode)."""
    if credentials is None:
        return None
    return verify_token(credentials.credentials)


async def require_auth(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
) -> dict:
    """Require a valid JWT token — raises 401 if missing or invalid."""
    return verify_token(credentials.credentials)
