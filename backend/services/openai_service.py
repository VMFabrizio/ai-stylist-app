class OpenAIService:
    """Placeholder for OpenAI-driven reasoning."""

    def __init__(self):
        self.ready = True

    def status(self):
        return {"service": "openai", "ready": self.ready}

    def generate_outfit_text(self, context: dict) -> dict:
        """Simulate AI response until real calls are added."""
        return {
            "summary": "AI outfit ideas would appear here.",
            "context_received": context,
        }
