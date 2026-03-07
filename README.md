# AI Stylist App

This repository contains a demo-ready fashion discovery experience. The backend (Python + Flask) transforms quiz answers into a taste summary with Gemini plus filters a mock catalog, while the frontend (Next.js) delivers a polished quiz-to-results flow.

## Project structure

- `backend/` – Flask server providing `/api/taste-profile`, `/api/recommendations`, and a catalog of 100 mock fashion items.
- `frontend/` – Next.js app with landing, quiz, and results pages styled like a premium editorial marketplace.
- `docs/` – architecture and schema guides for the project.

## Setup

1. **Backend**
   - Create a `.env` file inside `backend/` (copy `backend/.env.example`) and set `GEMINI_API_KEY` plus optional other keys.
   - Install dependencies: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
   - Start the server: `python app.py`. Use `BACKEND_PORT` to override if needed.
   - The backend listens on `http://localhost:5001` by default.

2. **Frontend**
   - Copy `frontend/.env.example` to `frontend/.env.local` if you need to override the backend URL.
   - Install dependencies: `npm install`.
   - Run the dev server: `npm run dev`.
   - Visit `http://localhost:3000`.

3. **Demo flow**
   - Open the landing page, click “Take the Style Quiz,” answer the prompts, and submit.
   - The quiz POSTs to `/api/taste-profile`, which returns the Gemini summary (or a fallback sentence) plus hashed preferences.
   - Immediately after, the frontend calls `/api/recommendations` to pull matching catalog items with filters.
   - The results page displays the taste sentence, filters, and a premium grid of product cards.

## Notes

- The Gemini key stays on the backend; the frontend never exposes it.
- The catalog is fully local (`backend/data/fashion_catalog.json`), so recommendations work even if Gemini is disabled.
- You can run backend and frontend in separate terminals. No additional tooling is required.
