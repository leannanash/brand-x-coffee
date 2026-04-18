import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  // ✅ instant hydration (prevents logout flicker on refresh)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(() => !user);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const data = await getMe();

        // ⚠️ handle both shapes safely
        const currentUser = data?.user || data;

        if (!currentUser) throw new Error("No user returned");

        if (isMounted) {
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ show loading only when needed
  if (loading) return <div>Loading...</div>;

  // ❌ not logged in
  if (!user) return <Navigate to="/login" replace />;

  // ❌ role mismatch
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ support both <ProtectedRoute children> and <Outlet>
  return children ? children : <Outlet />;
}