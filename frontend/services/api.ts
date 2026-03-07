const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function submitQuiz(payload: {
  user_id: string;
  responses: { image_id: string; liked: boolean; tags: string[] }[];
}) {
  const tasteResponse = await fetch(`${API_BASE}/api/taste-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!tasteResponse.ok) {
    const error = await tasteResponse.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.error || error.message || "Unable to generate taste profile");
  }

  const tasteData = await tasteResponse.json();

  const recommendationData = await fetchRecommendations({
    user_id: payload.user_id,
    preferences: tasteData.preferences,
    filters: {},
  });

  return {
    user_id: payload.user_id,
    taste_summary: tasteData.tasteProfile,
    preferences: tasteData.preferences,
    catalog_matches: recommendationData.items,
    responses: payload.responses,
  };
}

export async function fetchRecommendations(payload: {
  user_id: string;
  preferences?: Record<string, { tag: string }[]>;
  responses?: { image_id: string; liked: boolean; tags: string[] }[];
  filters?: Record<string, string>;
}) {
  const response = await fetch(`${API_BASE}/api/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.error || error.message || "Unable to fetch recommendations");
  }

  return response.json();
}
