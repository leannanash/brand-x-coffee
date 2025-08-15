import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Centered Links + Right Icons */}
        <div
          className={`navbar-nav ${menuOpen ? "show" : ""}`}
          id="navbarContent"
        >
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`nav-link ${location.pathname === path ? "active" : ""}`}
              onClick={() => setMenuOpen(false)} // close menu on click
            >
              {label}
            </Link>
          ))}

          {/* Icons right (hidden on mobile via CSS) */}
          <div className="navbar-icons ms-auto">
            <button className="icon-btn" aria-label="View shopping cart">
              <i className="fa-solid fa-bag-shopping"></i>
            </button>
            <button className="icon-btn" aria-label="User profile">
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
