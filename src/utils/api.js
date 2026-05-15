// src/utils/api.js
const API_URL = "https://brandx-backend-4vs6.onrender.com/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }

  return res.json();
}
