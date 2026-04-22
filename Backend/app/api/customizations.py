"""
Framify Backend — Customizations API
CRUD for user template customizations stored in MongoDB
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Any, Optional
from datetime import datetime, timezone
from bson import ObjectId
from app.db.mongodb import customizations_collection
from app.auth.jwt_handler import get_current_user, require_auth

router = APIRouter(prefix="/api", tags=["Customizations"])


class CustomizationPayload(BaseModel):
    template_id: str
    settings: dict[str, Any]


class CustomizationResponse(BaseModel):
    id: str
    template_id: str
    settings: dict[str, Any]
    updated_at: str


@router.get("/customizations")
async def get_customizations(user: dict = Depends(require_auth)):
    """Get all customizations for the authenticated user."""
    cursor = customizations_collection.find({"user_id": user["sub"]})
    results = []
    async for doc in cursor:
        results.append({
            "id": str(doc["_id"]),
            "template_id": doc["template_id"],
            "settings": doc.get("settings", {}),
            "updated_at": doc.get("updated_at", "").isoformat() if doc.get("updated_at") else "",
        })
    return {"customizations": results}


@router.get("/customizations/{template_id}")
async def get_customization(template_id: str, user: dict = Depends(require_auth)):
    """Get a single customization by template ID."""
    doc = await customizations_collection.find_one({
        "user_id": user["sub"],
        "template_id": template_id,
    })
    if not doc:
        return {"settings": None}
    return {
        "id": str(doc["_id"]),
        "template_id": doc["template_id"],
        "settings": doc.get("settings", {}),
        "updated_at": doc.get("updated_at", "").isoformat() if doc.get("updated_at") else "",
    }


@router.post("/customizations")
async def save_customization(payload: CustomizationPayload, user: dict = Depends(require_auth)):
    """Save or update a customization for the authenticated user."""
    now = datetime.now(timezone.utc)

    existing = await customizations_collection.find_one({
        "user_id": user["sub"],
        "template_id": payload.template_id,
    })

    if existing:
        await customizations_collection.update_one(
            {"_id": existing["_id"]},
            {"$set": {"settings": payload.settings, "updated_at": now}},
        )
        return {
            "success": True,
            "id": str(existing["_id"]),
            "updated_at": now.isoformat(),
        }
    else:
        doc = {
            "user_id": user["sub"],
            "template_id": payload.template_id,
            "settings": payload.settings,
            "created_at": now,
            "updated_at": now,
        }
        result = await customizations_collection.insert_one(doc)
        return {
            "success": True,
            "id": str(result.inserted_id),
            "updated_at": now.isoformat(),
        }


@router.delete("/customizations/{customization_id}")
async def delete_customization(customization_id: str, user: dict = Depends(require_auth)):
    """Delete a customization."""
    result = await customizations_collection.delete_one({
        "_id": ObjectId(customization_id),
        "user_id": user["sub"],
    })
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customization not found")
    return {"success": True}
