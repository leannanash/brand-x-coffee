import { createContext, useContext, useEffect, useState } from "react";
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  googleLogin as apiGoogleLogin,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // 🔥 Restore session on load
  // =========================
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getMe();
        const currentUser = data.user || data;

        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } catch (err) {
        setUser(null);
        apiLogout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // =========================
  // 🔐 EMAIL LOGIN
  // =========================
  const login = async (email, password) => {
    const result = await apiLogin(email, password);

    const currentUser = result.user;

    setUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));

    return currentUser;
  };

  // =========================
  // 🌐 GOOGLE LOGIN (FIXED)
  // =========================
  const googleLogin = async (googleToken) => {
    const result = await apiGoogleLogin(googleToken);

    const currentUser = result.user;

    // 🔥 THIS IS THE FIX (instant UI update)
    setUser(currentUser);

    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return currentUser;
  };

  // =========================
  // 🚪 LOGOUT
  // =========================
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        googleLogin, // ✅ exposed
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  return useContext(AuthContext);
}