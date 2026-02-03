import React from "react";
import LoginForm from "../../components/reusable/LoginForm";

export default function Login() {
  const handleLogin = (data) => {
    alert(`Logged in as ${data.email}`);
  };

  return (
    <>
      <h2 className="auth-title text-center mb-4">
        Login to Brand X Coffee
      </h2>

      <LoginForm onSubmit={handleLogin} />

      <div className="text-center mt-3">
        <small className="text-muted">
          Forgot password? Register? (later)
        </small>
      </div>
    </>
  );
}
