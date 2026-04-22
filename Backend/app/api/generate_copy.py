"""
Framify Backend — AI Copy Generation API
Uses OpenRouter to generate landing page copy
"""

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal
from app.config import get_settings

router = APIRouter(prefix="/api", tags=["AI Copy"])
settings = get_settings()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


class CopyRequest(BaseModel):
    product_description: str = Field(..., min_length=5, max_length=300)
    target_audience: str = Field(..., min_length=3, max_length=200)
    tone: Literal["bold", "professional", "warm", "playful"]
    template_name: str
    template_style: str
    template_category: str


class FeatureItem(BaseModel):
    title: str
    description: str


class CopyResponse(BaseModel):
    headline: str
    subheadline: str
    cta_text: str
    features: list[FeatureItem]
    footer_text: str


TONE_MAP = {
    "bold": "Bold and direct",
    "professional": "Professional and clean",
    "warm": "Warm and friendly",
    "playful": "Playful and creative",
}


@router.post("/generate-copy", response_model=CopyResponse)
async def generate_copy(payload: CopyRequest):
    """Generate landing page copy using OpenRouter AI."""

    if not settings.openrouter_api_key:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    system_prompt = (
        f"You generate conversion-focused landing page copy for {payload.template_name}. "
        f"Visual personality: {payload.template_style}. "
        f"Category: {payload.template_category}. "
        f"Tone: {TONE_MAP[payload.tone]}. "
        f"Return strict JSON only."
    )
    user_prompt = (
        f"Generate landing page copy for: {payload.product_description}. "
        f"Target audience: {payload.target_audience}. "
        f"Return ONLY JSON with {{ headline, subheadline, cta_text, "
        f"features: [{{title, description}}, {{title, description}}, {{title, description}}], "
        f"footer_text }}."
    )

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {settings.openrouter_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "openai/gpt-oss-20b:free",
                "temperature": 0.7,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            },
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="OpenRouter request failed")

    data = resp.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "")

    if not content:
        raise HTTPException(status_code=422, detail="No text response from AI")

    import json
    try:
        parsed = json.loads(content)
        return CopyResponse(**parsed)
    except (json.JSONDecodeError, Exception) as e:
        raise HTTPException(status_code=422, detail=f"AI response parsing failed: {str(e)}")
