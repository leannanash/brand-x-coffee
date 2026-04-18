import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user, authLoading } = useOutletContext();

  // ✅ wait for MainLayout auth check
  if (authLoading) return <div>Loading...</div>;

  // ❌ Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // ❌ Wrong role
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ support both usage styles
  return children ? children : <Outlet />;
}