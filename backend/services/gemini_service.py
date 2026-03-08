import os
import random
import logging

import requests


class GeminiService:
    """Wraps calls to the Gemini API and falls back to canned sentences."""

    ENDPOINT_TEMPLATE = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        "{model}:generateContent"
    )
    DEFAULT_MODELS = [
        "gemini-2.5-flash",
        "gemini-flash-latest",
        "gemini-2.0-flash-lite-001",
        "gemini-2.0-flash",
    ]
    FALLBACK_SUMMARIES = [
        "Minimalist neutral wardrobe focused on clean silhouettes",
        "Streetwear inspired outfits with oversized layers",
        "Vintage inspired feminine aesthetic",
        "Scandinavian minimalist fashion",
        "Edgy monochrome nightlife fashion",
        "Sporty athleisure driven style",
        "Quiet luxury with subtle premium brands",
        "Colorful expressive maximalist outfits",
        "Classic preppy fashion",
        "Casual everyday comfort style",
    ]

    def describe_taste(self, quiz_answers: list) -> str:
        """Call Gemini with the quiz answers and return a single sentence summary."""
        prompt = (
            "Based on the following quiz answers, describe the user's fashion taste in one concise sentence.\n\n"
            "Quiz answers:\n"
            f"{quiz_answers}\n\n"
            "Output a single sentence describing the user's style."
        )
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            logging.warning("Gemini fallback: GEMINI_API_KEY is missing.")
            return self._fallback()

        models = self._get_models()

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 120,
                "thinkingConfig": {"thinkingBudget": 0},
            },
        }
        for model in models:
            endpoint = self.ENDPOINT_TEMPLATE.format(model=model)
            try:
                response = requests.post(
                    endpoint,
                    params={"key": api_key},
                    json=payload,
                    timeout=10,
                )
                if response.status_code >= 400:
                    logging.error(
                        "Gemini model failed: model=%s status=%s body=%s",
                        model,
                        response.status_code,
                        response.text,
                    )
                    continue

                data = response.json()
                candidate_text = self._extract_candidate_text(data)
                if candidate_text:
                    return candidate_text
                logging.error("Gemini model failed: model=%s candidate text missing.", model)
            except requests.RequestException as error:
                logging.error("Gemini model failed: model=%s request error: %s", model, error)
                continue
            except ValueError as error:
                logging.error("Gemini model failed: model=%s invalid JSON: %s", model, error)
                continue

        return self._fallback()

    def _get_models(self) -> list:
        """Get model preference list from env or use defaults."""
        env_models = (os.getenv("GEMINI_MODELS") or "").strip()
        if not env_models:
            return self.DEFAULT_MODELS
        parsed = [value.strip() for value in env_models.split(",") if value.strip()]
        return parsed or self.DEFAULT_MODELS

    def _extract_candidate_text(self, data: dict) -> str:
        """Extract response text from Gemini generateContent payload."""
        candidates = data.get("candidates") or []
        if not candidates:
            return ""
        content = candidates[0].get("content") or {}
        parts = content.get("parts") or []
        if not parts:
            return ""
        return (parts[0].get("text") or "").strip()

    def _fallback(self) -> str:
        """Return one of the canned summaries."""
        return random.choice(self.FALLBACK_SUMMARIES)
