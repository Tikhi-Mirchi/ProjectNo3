"""
Framify Backend — FastAPI Application
Main entry point for the backend server

Run with:
  uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings
from app.db.mongodb import ping_db

# Import routers
from app.auth.google_oauth import router as auth_router
from app.api.generate_copy import router as generate_copy_router
from app.api.customizations import router as customizations_router
from app.api.export import router as export_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: verify MongoDB connection
    try:
        await ping_db()
        print("[OK] Connected to MongoDB")
    except Exception as e:
        print(f"[WARN] MongoDB connection failed: {e}")
        print("       The server will start but database operations will fail.")
    yield
    # Shutdown
    print("[STOP] Shutting down Framify Backend")


app = FastAPI(
    title="Framify API",
    description="Backend API for Framify — Premium Landing Page Template Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(auth_router)
app.include_router(generate_copy_router)
app.include_router(customizations_router)
app.include_router(export_router)


@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
    return {
        "status": "ok",
        "app": "Framify API",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
async def health():
    """Detailed health check with MongoDB status."""
    try:
        await ping_db()
        db_status = "connected"
    except Exception:
        db_status = "disconnected"

    return {
        "status": "ok",
        "database": db_status,
        "frontend_url": settings.frontend_url,
    }
