from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health_check():
    """Simple endpoint to confirm the backend is reachable."""
    return jsonify({"status": "ok", "message": "AI Stylist backend is healthy"}), 200
