# System Architecture for AI Stylist

## Overview

This app helps someone upload their picture, answer a visual quiz, and describe the vibe they want. It then uses AI to recommend outfits, shows real products with prices and links, and optionally delivers editorial-style outfit imagery. The document explains how each part of the app works together behind the scenes.

## User Flow

1. A visitor opens the web app in their browser.
2. They create an account or proceed as a guest (/create-user).
3. They upload a selfie or photo that captures their body and mood (/upload-photo).
4. They swipe through the quiz to express style preferences (/submit-quiz).
5. They describe the occasion or vibe they are dressing for.
6. The system sends all inputs to the backend, which queries AI and product sources.
7. AI generates outfit ideas, complete with explanations, product links, and optional editorial images.
8. The frontend displays the recommendations, prices, retailers, and buy buttons.

## System Components

- **Frontend (Next.js):** Renders the user interface, handles uploads, quiz swipes, and displays AI-driven outfits. It sends data to the backend and shows responses.
- **Backend (Python Flask):** Orchestrates the workflow, handles user requests, stores data, and coordinates with AI, product search, and image services.
- **Database (Supabase/Postgres):** Stores user profiles, quiz answers, uploaded photos, and recommendation history for personalization and analytics.
- **OpenAI API:** Powers reasoning and explanation. The backend sends prompts describing user input, quiz results, and vibe to generate outfit ideas and messaging.
- **Product Search (SerpAPI):** Finds real clothing items, prices, retailers, and buy links on the internet that match OpenAI’s recommendations.
- **Image Generation (Replicate):** Creates editorial-style outfit renderings or optional try-on images based on AI prompts and user data.

## Data Flow

1. The frontend sends user data (photo, quiz answers, vibe) to the backend.
2. The backend stores the data in Supabase for tracking and personalization.
3. The backend calls OpenAI with structured prompts to describe how outfits should be composed.
4. Based on OpenAI’s output, the backend calls SerpAPI to gather matching products.
5. If editorial/try-on imagery is requested, the backend sends prompts to Replicate and stores the generated media in Cloudinary.
6. The backend bundles outfits, explanations, prices, buy links, and any images, then returns them to the frontend.
7. The frontend renders the recommendations and offers buttons to purchase or save.

## Main Backend Endpoints

- `/create-user` – create or look up users before recommendations begin.
- `/upload-photo` – accept selfies or reference photos and store them securely.
- `/submit-quiz` – receive swipe quiz results and style preferences.
- `/recommend` – central endpoint that triggers OpenAI, product search, and image generation, then returns outfit data.
- `/feedback` – capture user reactions to refine future recommendations.

## MVP Scope

- Enable photo upload and quiz submission flows.
- Wire the frontend to Flask endpoints to collect all inputs.
- Send structured prompts to OpenAI and return outfit explanations.
- Query SerpAPI for product matches and include prices/links.
- Present recommendations on the UI with clear CTA buttons.
- Store user inputs and results in Supabase for simple history.

## Future Features

- Improved recommendation learning (e.g., feedback loop or collaborative filtering).
- Enhanced try-on experiences or live previews.
- Saved outfits and favorites for returning users.
- Shopping cart or retailer integration for smoother checkout.
- Notifications or reminders for upcoming occasions.

## Architecture Diagram

```
Frontend → Backend → Database → OpenAI API → Product Search → Image Generation
```
