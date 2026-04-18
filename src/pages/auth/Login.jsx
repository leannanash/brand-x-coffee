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

  const handleLogin = async (data) => {
    setError("");
    setLoginLoading(true);

    try {
      const user = await login(data.email, data.password);

      navigate(user.role === "admin" ? "/admin" : "/shop", {
        replace: true,
      });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  

  return (
    <AuthMotionWrapper>
      <h3 className="text-center mb-1">Welcome Back</h3>
      <p className="text-center text-muted mb-4">
        Login to Brand X Coffee ☕
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Google Sign-In */}
      <GoogleSignInButton
        loading={googleLoading}
        onSuccess={(data) => {
          const user = data.user;

          navigate(user.role === "admin" ? "/admin" : "/shop", {
            replace: true,
          });
        }}
        onError={(err) => {
          setError(err.message || "Google login failed");
        }}
      />

      <div className="auth-divider my-3">
        <span>or</span>
      </div>

      {/* Email/Password Login */}
      <LoginForm onSubmit={handleLogin} loading={loginLoading} />

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