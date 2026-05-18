import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthMotionWrapper from "./AuthMotionWrapper";
import { getPasswordStrength } from "../../utils/passwordStrength";
import { register as apiRegister, login as apiLogin } from "../../utils/auth";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const strength = getPasswordStrength(form.password);

  // =====================
  // HANDLE INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================
  // SUBMIT REGISTER
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();

    // validations
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Register user
      await apiRegister(form.name, email, form.password);

      // 2️⃣ Auto login
      const result = await apiLogin(email, form.password);

      const user = result.user;

      // 3️⃣ Redirect based on role
      const target =
        user?.role === "admin" ? "/admin" : "/shop";

      navigate(target, { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="mb-3">
          <input
            name="name"
            className="form-control"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD STRENGTH */}
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

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
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
