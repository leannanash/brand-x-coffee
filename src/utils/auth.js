const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// =====================
// REGISTER
// =====================
export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Register failed");

  return data;
}

// =====================
// LOGIN
// =====================
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  saveSession(data);
  return data;
}

// =====================
// SAVE SESSION
// =====================
function saveSession(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));
}

// =====================
// GET CURRENT USER (SAFE REFRESH)
// =====================
export async function getMe() {
  let token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated");

  let res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // if token expired → try refresh once
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Session expired");

    token = localStorage.getItem("accessToken");

    res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch user");

  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

// =====================
// REFRESH TOKEN
// =====================
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

// =====================
// LOGOUT (SYNC WITH BACKEND)
// =====================
export async function logout() {
  const token = localStorage.getItem("accessToken");

  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("Logout request failed (ignored)");
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

// =====================
// FORGOT PASSWORD
// =====================
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

// =====================
// RESET PASSWORD
// =====================
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

// =====================
// UPDATE PROFILE (SAFE REFRESH)
// =====================
export async function updateProfile(payload) {
  let token = localStorage.getItem("accessToken");

  let res = await fetch(`${API_URL}/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Session expired");

    token = localStorage.getItem("accessToken");

    res = await fetch(`${API_URL}/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");

  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

// =====================
// GOOGLE LOGIN
// =====================
export async function googleLogin(token) {
  const res = await fetch(`${API_URL}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Google login failed");

  saveSession(data);
  return data;
}

// =====================
// AUTH CHECK
// =====================
export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}

// =====================
// GET USER FROM STORAGE
// =====================
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}