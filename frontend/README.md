# Frontend Overview

The Next.js app powers the fashion-forward UI for the AI Stylist project. It keeps Gemini API keys on the backend while letting users take the quiz, read the generated taste summary, and explore curated catalog matches.

## Folder highlights

- `app/` – contains the landing page, the quiz flow, and the results view along with the global layout and styles.
- `components/` – reusable UI pieces (navbar, hero, cards, quiz question cards, filters, banner, etc.).
- `context/QuizContext.tsx` – holds the current quiz response so the results page can render the latest taste profile.
- `services/api.ts` – abstracts requests to the backend (`/api/taste-profile` and `/api/recommendations` endpoints).
- `data/quizQuestions.ts` – defines the curated quiz prompts and tag options.
- `public/` – place for static assets and placeholders if needed in the future.

## Running locally

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Copy `.env.example` to `.env.local` and adjust `NEXT_PUBLIC_API_URL` if your backend runs on a different port (default `http://localhost:5001`).

3. Start the dev server:

```bash
npm run dev
```

4. Visit `http://localhost:3000` to see the app.
