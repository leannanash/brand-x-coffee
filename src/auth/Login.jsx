import React from "react";
import LoginForm from "../components/reusable/LoginForm";
import "../styles/Login.css";
import bgImage from "../assets/imgs/homesection.jpg"; // import the image

export default function Login() {
  const handleLogin = (data) => {
    alert(`Logged in as ${data.email}`);
  };

  return (
    <div
      className="login-page d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-card card shadow-lg p-5 rounded-4">
        <h2 className="login-title text-center mb-4">
          Login to Brand X Coffee
        </h2>

        <LoginForm onSubmit={handleLogin} />

        <div className="text-center mt-3">
          <small className="text-muted">
            Forgot password? Register? (later)
          </small>
        </div>
      </div>
    </div>
  );
}
