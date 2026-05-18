import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthMotionWrapper from "./AuthMotionWrapper";
import LoginForm from "../../components/reusable/LoginForm";
import { useAuth } from "../../context/AuthContext";
import GoogleSignInButton from "./GoogleSignInButton";

export default function Login() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // =====================
  // EMAIL LOGIN
  // =====================
  const handleLogin = async (data) => {
    setError("");
    setLoginLoading(true);

    try {
      const user = await login(data.email, data.password);

      const target =
        user?.role === "admin" ? "/admin" : "/shop";

      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  // =====================
  // GOOGLE LOGIN
  // =====================
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setGoogleLoading(true);

    try {
      const token = credentialResponse.credential;

      // IMPORTANT: your AuthContext must expose this
      const data = await login.google(token);

      const user = data.user;

      const target =
        user?.role === "admin" ? "/admin" : "/shop";

      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthMotionWrapper>
      <h3 className="text-center mb-1">Welcome Back</h3>
      <p className="text-center text-muted mb-4">
        Login to Brand X Coffee ☕
      </p>

      {/* ERROR MESSAGE */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* GOOGLE LOGIN */}
      <GoogleSignInButton
        loading={googleLoading}
        onSuccess={handleGoogleSuccess}
        onError={(err) => {
          setError(err.message || "Google login failed");
        }}
      />

      <div className="auth-divider my-3">
        <span>or</span>
      </div>

      {/* EMAIL LOGIN */}
      <LoginForm onSubmit={handleLogin} loading={loginLoading} />

      {/* LINKS */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Link to="/forgot-password" className="btn btn-link p-0">
          Forgot password?
        </Link>

        <Link to="/register" className="btn btn-outline-primary btn-sm">
          Create account
        </Link>
      </div>
    </AuthMotionWrapper>
  );
}