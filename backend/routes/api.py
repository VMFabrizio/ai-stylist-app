from flask import Blueprint, jsonify, request

from services.catalog_service import CatalogService
from services.gemini_service import GeminiService
from services.profile_service import ProfileService
from services.quiz_service import QuizService

api_bp = Blueprint("api", __name__)

quiz_service = QuizService()
catalog_service = CatalogService()
gemini_service = GeminiService()
profile_service = ProfileService()


def _require_json_body(payload):
    if not payload:
        return jsonify({"error": "Request body must be JSON"}), 400
    return None


@api_bp.route("/taste-profile", methods=["POST"])
def taste_profile():
    """Return a concise taste summary built from quiz answers."""
    payload = request.get_json(silent=True)
    missing = _require_json_body(payload)
    if missing:
        return missing

    user_id = payload.get("user_id")
    responses = payload.get("responses")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    if not isinstance(responses, list):
        return jsonify({"error": "responses must be an array"}), 400

    preferences = quiz_service.build_taste_profile(responses)
    taste_summary = gemini_service.describe_taste(responses)
    quiz_save = quiz_service.persist_quiz_responses(user_id, responses)
    profile_save = quiz_service.update_user_preferences(user_id, preferences)

    return jsonify(
        {
            "tasteProfile": taste_summary,
            "preferences": preferences,
            "quiz_saved": quiz_save,
            "profile_saved": profile_save,
        }
    ), 200


@api_bp.route("/recommendations", methods=["POST"])
def recommendations():
    """Return catalog matches filtered by preferences or quiz answers."""
    payload = request.get_json(silent=True)
    missing = _require_json_body(payload)
    if missing:
        return missing

    user_id = payload.get("user_id")
    preferences = payload.get("preferences")
    responses = payload.get("responses")
    filters = payload.get("filters") or {}

    if not preferences and responses:
        preferences = quiz_service.build_taste_profile(responses)
    if not preferences and user_id:
        preferences = profile_service.get_profile(user_id).get("preferences", {})

    items = catalog_service.search(preferences or {}, filters=filters)

    return jsonify({"items": items, "filters": filters}), 200
