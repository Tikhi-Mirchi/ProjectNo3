"""
Framify Backend — MongoDB connection
Uses Motor (async MongoDB driver)
"""

from motor.motor_asyncio import AsyncIOMotorClient
from app.config import get_settings

settings = get_settings()

client = AsyncIOMotorClient(settings.mongodb_uri)
db = client[settings.database_name]

# Collections
users_collection = db["users"]
customizations_collection = db["customizations"]
exports_collection = db["exports"]


async def ping_db():
    """Test MongoDB connection."""
    await client.admin.command("ping")
    return True
