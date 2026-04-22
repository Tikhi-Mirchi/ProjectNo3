"""
Framify Backend — Export API
Generates a downloadable ZIP with the customized template
"""

import io
import zipfile
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Any
from datetime import datetime, timezone
from app.db.mongodb import exports_collection
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/api", tags=["Export"])


class ExportRequest(BaseModel):
    template_id: str
    settings: dict[str, Any]


def build_tokens_css(settings: dict) -> str:
    """Build a CSS custom properties file from template settings."""
    brand = settings.get("brand", {})
    typo = settings.get("typography", {})

    lines = [":root {"]
    if brand.get("primaryColor"):
        lines.append(f"  --primary: {brand['primaryColor']};")
    if brand.get("secondaryColor"):
        lines.append(f"  --secondary: {brand['secondaryColor']};")
    if brand.get("accentColor"):
        lines.append(f"  --accent: {brand['accentColor']};")
    if brand.get("backgroundColor"):
        lines.append(f"  --background: {brand['backgroundColor']};")
    if typo.get("headingFont"):
        lines.append(f"  --font-heading: '{typo['headingFont']}', sans-serif;")
    if typo.get("bodyFont"):
        lines.append(f"  --font-body: '{typo['bodyFont']}', sans-serif;")
    lines.append("}")
    return "\n".join(lines)


def build_readme(template_id: str) -> str:
    """Generate a README for the exported template."""
    return f"""# {template_id} — Exported from Framify

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

```bash
npx vercel
```

## Customization

Your brand settings are baked into `tokens.css`.
Edit this file to further customize colors, fonts, and spacing.

---

Built with [Framify](https://framify.dev)
"""


@router.post("/export")
async def export_template(payload: ExportRequest, user: dict | None = Depends(get_current_user)):
    """Generate and return a ZIP file with the customized template."""

    # Create in-memory ZIP
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        # tokens.css
        zf.writestr("tokens.css", build_tokens_css(payload.settings))

        # README.md
        zf.writestr("README.md", build_readme(payload.template_id))

        # package.json placeholder
        content = payload.settings.get("content", {})
        pkg = {
            "name": f"framify-{payload.template_id}",
            "version": "1.0.0",
            "private": True,
            "scripts": {"dev": "next dev", "build": "next build", "start": "next start"},
            "dependencies": {
                "next": "14.2.5",
                "react": "^18",
                "react-dom": "^18",
                "tailwindcss": "^3.4",
            },
        }
        import json
        zf.writestr("package.json", json.dumps(pkg, indent=2))

        # Placeholder page with user content
        headline = content.get("headline", "Your Headline")
        subheadline = content.get("subheadline", "Your Subheadline")
        cta_text = content.get("ctaText", "Get Started")
        page_content = f'''export default function Home() {{
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">{headline}</h1>
        <p className="text-xl text-gray-600">{subheadline}</p>
        <button className="bg-primary px-8 py-3 rounded-lg font-semibold">
          {cta_text}
        </button>
      </div>
    </main>
  );
}}
'''
        zf.writestr("app/page.tsx", page_content)

    zip_buffer.seek(0)

    # Log export in MongoDB
    if user:
        await exports_collection.insert_one({
            "user_id": user["sub"],
            "template_id": payload.template_id,
            "exported_at": datetime.now(timezone.utc),
        })

    filename = f"framify-{payload.template_id}-{int(datetime.now().timestamp())}.zip"
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
