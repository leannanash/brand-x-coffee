import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./reusable/LoginForm";

export default function LoginModal({ show, onClose }) {
  const navigate = useNavigate();
  if (!show) return null;

  const handleLogin = (data) => {
    // Replace with real auth
    alert(`Logged in as ${data.email}`);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modal-content rounded-4 p-4 shadow-sm bg-white"
        style={{ minWidth: "320px", maxWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-3">
          <h5>Login to Brand X Coffee</h5>
        </div>

        <LoginForm onSubmit={handleLogin} />

        <div className="text-center mt-3">
          <small>
            Want full login page?{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
            >
              Go here →
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}
