import React from "react";
import { Link } from "react-router-dom";  // <-- import Link
import logo from "../assets/imgs/logo.jpg";

export default function Header() {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg bg-white py-3 fixed-top shadow-sm"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Brand X Coffee Logo" className="logo" />
          <span className="brand">Brand X Coffee</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-4">
            {navLinks.map(({ label, path }) => (
              <li className="nav-item" key={label}>
                <Link className="nav-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}

            {/* Icons */}
            <li className="nav-item d-flex align-items-center gap-3 ms-lg-3">
              <button className="icon-btn" aria-label="View shopping cart">
                <i className="fa-solid fa-bag-shopping"></i>
              </button>
              <button className="icon-btn" aria-label="User profile">
                <i className="fa-solid fa-user"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
