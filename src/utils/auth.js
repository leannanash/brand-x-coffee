const API_URL = "http://localhost:5000/api/auth";

// ======== REGISTER ========
export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || "Register failed");

  return data;
}

// ======== LOGIN ========
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  // Save access & refresh tokens
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// ======== GET CURRENT USER ========
export async function getMe() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // If access token expired, try refreshing
  if (res.status === 401) {
    const success = await refreshAccessToken();
    if (!success) throw new Error("Not authenticated");
    return getMe(); // retry with new access token
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user");

  return data;
}

// ======== REFRESH ACCESS TOKEN ========
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();
  if (!res.ok) {
    logout();
    return false;
  }

  // Save new access token
  localStorage.setItem("accessToken", data.accessToken);
  return true;
}

// ======== LOGOUT ========
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
