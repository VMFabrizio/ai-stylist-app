from app import create_app


def run_tests():
    app = create_app()
    client = app.test_client()

    sample_payload = {
        "user_id": "test-user",
        "responses": [
            {"image_id": "q1", "liked": True, "tags": ["minimalist", "neutral", "tailored"]},
            {"image_id": "q2", "liked": False, "tags": ["bold", "streetwear", "oversized"]},
            {"image_id": "q3", "liked": True, "tags": ["feminine", "pastel", "flowy"]},
        ],
    }

    taste_response = client.post("/api/taste-profile", json=sample_payload)
    assert taste_response.status_code == 200, "Taste profile endpoint failed"
    data = taste_response.get_json()
    assert "tasteProfile" in data and data["tasteProfile"], "Taste summary missing"

    rec_payload = {
        "user_id": "test-user",
        "preferences": data["preferences"],
        "filters": {"color": "black"},
    }
    rec_response = client.post("/api/recommendations", json=rec_payload)
    assert rec_response.status_code == 200, "Recommendations endpoint failed"
    rec_data = rec_response.get_json()
    assert isinstance(rec_data.get("items"), list), "No items returned"
    assert rec_data["filters"]["color"] == "black"

    print("Backend endpoint tests passed.")


if __name__ == "__main__":
    run_tests()
