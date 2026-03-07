# Database Schema for AI Stylist

## Overview

The database tracks who is using the app, what style choices they made, and which recommendations or feedback they produced. Keeping this data organized helps the backend personalize outfits, resume sessions, and learn from feedback without storing duplicate or temporary information.

## Tables

### `user_profiles`
- **Purpose:** Store account or guest identifiers plus profile metadata (email, preferred pronouns, baseline info).
- **Columns:**
  - `id` (UUID, primary key) – unique user identifier.
  - `username` (text) – user-friendly name or alias.
  - `email` (text, nullable) – for account recovery or notifications.
  - `created_at` (timestamp) – when the profile was created.
  - `photo_url` (text, nullable) – last uploaded user photo location.
- **Example:** `{"id": "uuid-123", "username": "stylefan", "email": "me@example.com", "created_at": "2026-03-07T12:00:00Z", "photo_url": "https://.../uploads/selfie.jpg"}`.

### `quiz_responses`
- **Purpose:** Capture quiz answers that express style preferences.
- **Columns:**
  - `id` (UUID, primary key).
  - `user_id` (UUID, foreign key → `user_profiles.id`).
  - `responses` (jsonb) – array or object describing swiped cards and weights.
  - `created_at` (timestamp).
- **Example:** `{"id": "quiz-456", "user_id": "uuid-123", "responses": [{"card": "minimalist", "score": 5}], "created_at": "2026-03-07T12:05:00Z"}`.

### `recommendation_sessions`
- **Purpose:** Record each time outfits are generated so we can tie outputs to inputs (photo, vibe, quiz, suggestions).
- **Columns:**
  - `id` (UUID, primary key).
  - `user_id` (UUID, foreign key).
  - `quiz_id` (UUID, nullable, foreign key).
  - `photo_url` (text, nullable).
  - `vibe` (text) – occasion or mood described by user.
  - `results` (jsonb) – structured instance of outfits, explanations, product links.
  - `created_at` (timestamp).
- **Example:** `{"id": "rec-789", "user_id": "uuid-123", "quiz_id": "quiz-456", "photo_url": "https://.../selfie.jpg", "vibe": "rooftop dinner", "results": {...}, "created_at": "2026-03-07T12:10:00Z"}`.

### `feedback_events`
- **Purpose:** Track user reactions to specific recommendations for future learning.
- **Columns:**
  - `id` (UUID, primary key).
  - `session_id` (UUID, foreign key → `recommendation_sessions.id`).
  - `rating` (integer, 1–5 scale).
  - `notes` (text, nullable) – optional explanation.
  - `created_at` (timestamp).
- **Example:** `{"id": "fb-321", "session_id": "rec-789", "rating": 4, "notes": "Loved the vibe but wish for warmer colors.", "created_at": "2026-03-07T12:15:00Z"}`.

## Relationships

- `user_profiles` is the parent table. Every quiz response and recommendation session links back to one user.
- `quiz_responses` → `recommendation_sessions` is optional but helpful: sessions can reference the quiz that generated the style profile.
- `recommendation_sessions` → `feedback_events` captures which session a user responded to.

## MVP Notes

- Essential now: user profiles, quiz answers, recommendation sessions, and feedback records. They let us run a complete flow from upload → AI → store → feedback.
- Later: more detailed product tables, analytics logs, or collaborative tables for saved outfits.

## Optional Future Tables

- `saved_outfits` to let users bookmark combinations.
- `product_clicks` or `retailer_events` to understand which links drive engagement.
- `session_variants` if you show multiple outfit threads per request.
