import os

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from routes.api import api_bp
from routes.health import health_bp

load_dotenv()


def create_app() -> Flask:
    """Create and configure the Flask application."""
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints for each area of the backend
    app.register_blueprint(health_bp)
    app.register_blueprint(api_bp, url_prefix="/api")

    # Basic root route for quick sanity checks
    @app.route("/")
    def root() -> jsonify:
        return jsonify({"message": "AI Stylist backend is running"}), 200

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("BACKEND_PORT", "5001"))
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() in {"1", "true", "yes"}
    app.run(host="127.0.0.1", port=port, debug=debug_mode, use_reloader=False)
