import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";

export default function Header({ cartCount = 0, onBasketToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Brand Logo" className="logo" />
          <span className="brand">Brand X Coffee</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-nav ${menuOpen ? "show" : ""}`}>
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`nav-link ${
                location.pathname === path ? "active" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Mobile-only icons */}
          <div className="navbar-icons-mobile">
            <button className="icon-btn basket-btn" onClick={onBasketToggle}>
              <i className="fa-solid fa-bag-shopping"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <div className="account-wrapper" ref={mobileDropdownRef}>
              <button
                className="account-btn"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <i className="fa-solid fa-user"></i>
                {user && <span className="username">{user.name}</span>}
              </button>

              {accountOpen && (
                <div className="account-dropdown">
                  {user ? (
                    <>
                      <div className="dropdown-user">
                        <div className="avatar">{user.name?.charAt(0)}</div>
                        <div>
                          <strong>{user.name}</strong>
                          <small>{user.email}</small>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setAccountOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={() => setAccountOpen(false)}
                    >
                      Login / Register
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop icons */}
        <div className="navbar-icons" ref={desktopDropdownRef}>
          <button className="icon-btn basket-btn" onClick={onBasketToggle}>
            <i className="fa-solid fa-bag-shopping"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <div className="account-wrapper">
            <button
              className="icon-btn account-btn"
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <i className="fa-solid fa-user"></i>
              {user && <span className="username">{user.name}</span>}
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                {user ? (
                  <>
                    <div className="dropdown-user">
                      <div className="avatar">{user.name?.charAt(0)}</div>
                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setAccountOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setAccountOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}