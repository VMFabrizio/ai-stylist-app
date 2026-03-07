from collections import defaultdict
from typing import Any, Dict, List

from services.profile_service import ProfileService


class QuizService:
    """Handles in-memory scoring of quiz tags and placeholder persistence."""

    _quiz_store: dict[str, List[Dict[str, Any]]] = {}

    STYLE_KEYWORDS = {
        "minimalist",
        "streetwear",
        "formal",
        "bohemian",
        "athleisure",
        "edgy",
        "vintage",
        "clean",
        "modern",
    }
    COLOR_KEYWORDS = {
        "black",
        "white",
        "red",
        "blue",
        "green",
        "neutral",
        "pastel",
        "earth",
        "bold",
        "metallic",
    }
    FIT_KEYWORDS = {
        "oversized",
        "slim",
        "tailored",
        "flowy",
        "structured",
        "boxy",
        "cropped",
        "relaxed",
        "fitted",
    }

    def __init__(self):
        self.profile_service = ProfileService()

    def build_taste_profile(self, responses: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
        """Score tags from quiz responses and return preference summaries."""
        style_scores = defaultdict(float)
        color_scores = defaultdict(float)
        fit_scores = defaultdict(float)

        for item in responses:
            liked = bool(item.get("liked"))
            tags = item.get("tags", [])
            weight = 1.0 if liked else -0.5

            for tag in tags:
                normalized = tag.strip().lower()
                if normalized in self.STYLE_KEYWORDS:
                    style_scores[normalized] += weight
                if normalized in self.COLOR_KEYWORDS:
                    color_scores[normalized] += weight
                if normalized in self.FIT_KEYWORDS:
                    fit_scores[normalized] += weight

        return {
            "style_archetypes": self._top_entries(style_scores),
            "color_preferences": self._top_entries(color_scores),
            "fit_preferences": self._top_entries(fit_scores),
        }

    def persist_quiz_responses(self, user_id: str, responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Placeholder for saving quiz data to Supabase/Postgres."""
        self._quiz_store[user_id] = responses
        return {
            "status": "mocked",
            "user_id": user_id,
            "responses_saved": len(responses),
        }

    def update_user_preferences(
        self, user_id: str, preferences: Dict[str, List[Dict[str, Any]]]
    ) -> Dict[str, Any]:
        """Placeholder for updating preference summary on the user profile."""
        return self.profile_service.save_preferences(user_id, preferences)

    def _top_entries(self, scores: Dict[str, float], limit: int = 3) -> List[Dict[str, Any]]:
        """Return the top scoring tags sorted by value."""
        sorted_items = sorted(scores.items(), key=lambda item: item[1], reverse=True)
        return [
            {"tag": tag, "score": weight}
            for tag, weight in sorted_items
            if weight > 0
        ][:limit]
