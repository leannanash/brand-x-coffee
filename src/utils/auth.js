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

  if (res.status === 401) {
    const success = await refreshAccessToken();
    if (!success) throw new Error("Not authenticated");
    return getMe();
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user");

  // 🔥 IMPORTANT: keep user fresh
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

// ======== REFRESH ACCESS TOKEN ========
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

// ======== UPDATE PROFILE ========
export async function updateProfile(data) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!res.ok) throw new Error(response.message || "Update failed");

  // update stored user
  localStorage.setItem("user", JSON.stringify(response.user));

  return response;
}

// ======== GOOGLE LOGIN ========
export async function googleLogin(token) {
  const res = await fetch(`${API_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Google login failed");

  // Save tokens (same pattern as normal login)
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}