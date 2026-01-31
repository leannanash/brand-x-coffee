import React from "react";

export default function Login() {
  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login to Brand X Coffee</h2>

      <div className="card shadow-sm p-4 rounded-4">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="you@example.com" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="••••••••" />
        </div>

        <button className="btn btn-warning w-100 mb-2">Login</button>

        <div className="text-center">
          <small className="text-muted">Forgot password? Register? (later)</small>
        </div>
      </div>
    </div>
  );
}
