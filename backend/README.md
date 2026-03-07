# Backend Overview

This folder contains the Flask backend powering the AI Stylist experience. It loads environment variables, enables CORS for local development, and exposes demo-ready `taste-profile` and `recommendations` APIs that rely on the Gemini service plus a mock catalog.

## Structure

- `app.py` – bootstraps Flask, enables CORS, and mounts the `/health` and `/api/*` blueprints.
- `routes/api.py` – endpoints for taste profile generation and catalog search/filters.
- `routes/health.py` – simple health check at `/health`.
- `services/` – encapsulates Gemini calls, quiz scoring, profile persistence, and catalog search.
- `data/fashion_catalog.json` – 100-item mock fashion dataset used for recommendations.
- `.env.example` – shows required API keys (including `GEMINI_API_KEY`) and defaults.
- `requirements.txt` – Python dependencies such as Flask, Flask-Cors, dotenv, and requests.

## Running Locally

1. Create a virtual environment and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Copy `.env.example` to `.env`, fill in your `GEMINI_API_KEY`, and keep the file local. If the key is missing, the service falls back to curated sentences.

3. Start the backend (adjust `BACKEND_PORT` to change the port if needed):

```bash
python app.py
```

4. Visit `http://localhost:5001/health` to ensure the server is live.

## API Endpoints

- `POST /api/taste-profile` – accepts `{ user_id, responses }` and returns:
  - `tasteProfile`: one-sentence Gemini summary (fallback sentences load if Gemini fails).
  - `preferences`: style/color/fit buckets generated from tags.
  - `quiz_saved` / `profile_saved`: mocked persistence metadata for future Supabase wiring.

- `POST /api/recommendations` – accepts `{ user_id, preferences, responses?, filters? }` and returns:
  - `items`: matching catalog entries from `data/fashion_catalog.json`.
  - `filters`: echo of applied filters (`category`, `color`, `price`, `tag`, `search`).
  - Filters are applied server-side, while tag scoring keeps the return list focused on the user’s taste.

## Taste Profile Fallbacks

- Ten curated sentences cover minimalist, streetwear, vintage, luxury, sporty, casual, edgy, feminine, workwear, and avant-garde aesthetics when Gemini is offline.
- The catalog search relies on style tags matching those preferences so frontend demos work even without real AI calls.
- Gemini taste summaries are generated in `services/gemini_service.py` (falling back to a curated list of 10 style sentences) and catalog matches from `services/catalog_service.py` load the 100-item mock dataset so quiz submissions can immediately show AI styling and matching items.
