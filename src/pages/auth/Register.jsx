import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthMotionWrapper from "./AuthMotionWrapper";
import { getPasswordStrength } from "../../utils/passwordStrength";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // TODO: replace with real API call
      await new Promise((res) => setTimeout(res, 1200));
      alert("Registered successfully!");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthMotionWrapper>
      <h3 className="text-center mb-1">Create Account</h3>
      <p className="text-center text-muted mb-4">
        Join Brand X Coffee ☕
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="name"
            className="form-control"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        {form.password && (
          <div className="mb-3">
            <div className="progress" style={{ height: 6 }}>
              <div
                className={`progress-bar bg-${strength.color}`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <small className={`text-${strength.color}`}>
              Strength: {strength.label}
            </small>
          </div>
        )}

        <div className="mb-4">
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </small>
        </div>
      </form>
    </AuthMotionWrapper>
  );
}
