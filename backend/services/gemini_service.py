import os
import random

import requests


class GeminiService:
    """Wraps calls to the Gemini API and falls back to canned sentences."""

    ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0:generateText"
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

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")

    def describe_taste(self, quiz_answers: list) -> str:
        """Call Gemini with the quiz answers and return a single sentence summary."""
        prompt = (
            "Based on the following quiz answers, describe the user's fashion taste in one concise sentence.\n\n"
            "Quiz answers:\n"
            f"{quiz_answers}\n\n"
            "Output a single sentence describing the user's style."
        )

        if not self.api_key:
            return self._fallback()

        payload = {
            "prompt": {"text": prompt},
            "temperature": 0.4,
            "maxOutputTokens": 120,
        }
        try:
            response = requests.post(
                self.ENDPOINT,
                params={"key": self.api_key},
                json=payload,
                timeout=5,
            )
            response.raise_for_status()
            data = response.json()
            candidates = data.get("candidates") or []
            if candidates:
                return candidates[0].get("output", "").strip() or self._fallback()
        except requests.RequestException:
            return self._fallback()

        return self._fallback()

    def _fallback(self) -> str:
        """Return one of the canned summaries."""
        return random.choice(self.FALLBACK_SUMMARIES)
