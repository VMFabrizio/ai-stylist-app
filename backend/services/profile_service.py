class ProfileService:
    """Manages user profiles and taste data (placeholder)."""

    _profiles: dict[str, dict] = {}

    def __init__(self):
        self.ready = True

    def status(self):
        return {"service": "profile", "ready": self.ready}

    def sync_profile(self, user_id: str, data: dict):
        """Pretend to save profile details for now."""
        return {"user_id": user_id, "saved": True, "payload": data}

    def save_preferences(self, user_id: str, preferences: dict) -> dict:
        """Mock saving the summarized preferences to a profile."""
        profile = self._profiles.get(user_id, {})
        profile["user_id"] = user_id
        profile["preferences"] = preferences
        self._profiles[user_id] = profile
        return {"status": "mocked", "user_id": user_id, "preferences_saved": bool(preferences)}

    def get_profile(self, user_id: str) -> dict:
        """Return the stored profile or a default structure."""
        if user_id in self._profiles:
            return self._profiles[user_id]

        return {
            "user_id": user_id,
            "preferences": {
                "style_archetypes": [{"tag": "minimalist"}],
                "color_preferences": [{"tag": "neutral"}],
                "fit_preferences": [{"tag": "tailored"}],
            },
        }
