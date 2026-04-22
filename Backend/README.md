# Framify Backend

FastAPI-powered backend for the Framify platform.

## Structure

```
Backend/
├── .env                    # Environment variables
├── requirements.txt        # Python dependencies
├── app/
│   ├── main.py             # FastAPI entry point
│   ├── config.py           # Pydantic settings (loads .env)
│   ├── __init__.py
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── jwt_handler.py  # JWT create/verify + FastAPI deps
│   │   └── google_oauth.py # Google OAuth + login/signup routes
│   ├── api/
│   │   ├── __init__.py
│   │   ├── generate_copy.py # AI copy generation (OpenRouter)
│   │   ├── customizations.py # CRUD for user settings
│   │   └── export.py       # ZIP template export
│   └── db/
│       ├── __init__.py
│       └── mongodb.py      # Motor async MongoDB client
```

## Quick Start

```bash
# 1. Create virtual environment
cd Backend
python -m venv .venv

# 2. Activate it
# Windows:
.\.venv\Scripts\Activate.ps1
# Mac/Linux:
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Fill in .env with your credentials

# 5. Start the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint                      | Auth     | Description                    |
|--------|-------------------------------|----------|--------------------------------|
| GET    | `/`                           | —        | Health check                   |
| GET    | `/health`                     | —        | Detailed health with DB status |
| POST   | `/auth/google`                | —        | Google OAuth code exchange     |
| POST   | `/auth/login`                 | —        | Email/password login           |
| POST   | `/auth/signup`                | —        | Email/password signup          |
| GET    | `/auth/me`                    | JWT      | Current user profile           |
| POST   | `/api/generate-copy`          | —        | AI landing page copy           |
| GET    | `/api/customizations`         | JWT      | List user customizations       |
| GET    | `/api/customizations/{id}`    | JWT      | Get single customization       |
| POST   | `/api/customizations`         | JWT      | Save/update customization      |
| DELETE | `/api/customizations/{id}`    | JWT      | Delete customization           |
| POST   | `/api/export`                 | Optional | Download template ZIP          |

## Environment Variables

See `.env` for all required variables:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for signing JWTs
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `OPENROUTER_API_KEY` — AI copy generation
- `FRONTEND_URL` — For CORS configuration
