import os

from dotenv import load_dotenv


def load_config():
    """Read environment variables from .env file."""
    load_dotenv()
    return {
        "SUPABASE_URL": os.getenv("SUPABASE_URL", ""),
        "SUPABASE_KEY": os.getenv("SUPABASE_KEY", ""),
        "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY", ""),
        "SERPAPI_KEY": os.getenv("SERPAPI_KEY", ""),
        "REPLICATE_API_KEY": os.getenv("REPLICATE_API_KEY", ""),
        "CLOUDINARY_URL": os.getenv("CLOUDINARY_URL", ""),
    }
