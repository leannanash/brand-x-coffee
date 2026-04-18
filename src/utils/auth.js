const API_URL = "http://localhost:5000/api/auth";

// ===== LOGIN =====
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  // ✅ store tokens + user
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// ===== GET CURRENT USER =====
export async function getMe() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 401) {
    const success = await refreshAccessToken();
    if (!success) throw new Error("Not authenticated");
    return getMe();
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user");

  // ✅ IMPORTANT: return ONLY user
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}

// ===== REFRESH TOKEN =====
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();
  if (!res.ok) {
    logout();
    return false;
  }

  localStorage.setItem("accessToken", data.accessToken);
  return true;
}

// ===== LOGOUT =====
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

// ======== FORGOT PASSWORD ========
export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send reset link");

  return data;
}
// ======== RESET PASSWORD ========
export async function resetPassword(token, password) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to reset password");

  return data;
}

export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}