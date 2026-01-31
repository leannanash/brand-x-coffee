import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title">Login to Brand X Coffee</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="you@example.com" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="••••••••" />
              </div>

              <button type="button" className="btn btn-warning w-100 mb-2">
                Login
              </button>
            </form>

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
      </div>
    </div>
  );
}
