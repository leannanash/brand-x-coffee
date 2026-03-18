import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  // ✅ Case-insensitive role check
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}