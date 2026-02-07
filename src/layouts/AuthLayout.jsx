import React from "react";
import { Outlet } from "react-router-dom";
import bgImage from "../assets/imgs/homesection.jpg";

export default function AuthLayout() {
  return (
    <div
      className="auth-layout d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background overlay for better contrast */}
      <div className="auth-overlay"></div>
      <div className="auth-card card shadow-lg p-5 rounded-4">
        <Outlet />
      </div>
    </div>
  );
}
