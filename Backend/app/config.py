"""
Framify Backend — Configuration
Loads environment variables from .env
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # MongoDB
    mongodb_uri: str = "mongodb://localhost:27017/framify"
    database_name: str = "framify"

    # JWT
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expiry_hours: int = 24

    # Google OAuth
    google_client_id: str = ""
    google_client_secret: str = ""

    # GitHub OAuth
    github_client_id: str = ""
    github_client_secret: str = ""

    # OpenRouter
    openrouter_api_key: str = ""

    # App
    frontend_url: str = "http://localhost:3001"
    backend_url: str = "http://localhost:8000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
