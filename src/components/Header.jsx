import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";

export default function Header({ cartCount = 0, onBasketToggle, onLoginClick }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Brand X Coffee Logo" className="logo" />
          <span className="brand">Brand X Coffee</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-nav ${menuOpen ? "show" : ""}`}>
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`nav-link ${location.pathname === path ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Right icons */}
          <div className="navbar-icons ms-auto">
            {/* View Basket */}
            <button
              className="icon-btn position-relative"
              aria-label="View basket"
              onClick={onBasketToggle}
            >
              <i className="fa-solid fa-bag-shopping"></i>

              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* User */}
            <button className="icon-btn" aria-label="User profile" onClick={onLoginClick}>
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
