import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthMotionWrapper from "./AuthMotionWrapper";
import LoginForm from "../../components/reusable/LoginForm";
import { login as apiLogin } from "../../utils/auth"; // use new auth.js

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);

    try {
      // Call auth.js login function (handles saving access + refresh tokens)
      const result = await apiLogin(data.email, data.password);

      // Redirect based on user role
      if (result.user.role === "admin") navigate("/admin");
      else navigate("/shop");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Sign-In coming soon 🚀");
  };

  return (
    <AuthMotionWrapper>
      <h3 className="text-center mb-1">Welcome Back</h3>
      <p className="text-center text-muted mb-4">
        Login to Brand X Coffee ☕
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Google Sign-In */}
      <button
        className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          width="18"
          height="18"
        />
        Continue with Google
      </button>

      <div className="auth-divider my-3">
        <span>or</span>
      </div>

      {/* Email/Password Login Form */}
      <LoginForm onSubmit={handleLogin} loading={loading} />

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
