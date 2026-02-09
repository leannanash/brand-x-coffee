import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import AuthMotionWrapper from "./AuthMotionWrapper";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send reset link");
      }

      setMessage(result.message || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthMotionWrapper>
      <h3 className="text-center mb-1">Forgot Password</h3>
      <p className="text-center text-muted mb-4">
        We’ll send you a reset link 📧
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-center mt-3">
          <small>
            Remembered your password? <Link to="/login">Back to Login</Link>
          </small>
        </div>
      </form>
    </AuthMotionWrapper>
  );
}
