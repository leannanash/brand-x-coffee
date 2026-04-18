import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";
import { useAuth } from "../context/AuthContext";

export default function Header({ cartCount = 0, onBasketToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth(); // ✅ SINGLE SOURCE OF TRUTH

  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopOpen(false);
      }

      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 LOGOUT (NOW CLEAN)
  const handleLogout = () => {
    logout(); // ✅ from AuthContext
    setDesktopOpen(false);
    setMenuOpen(false);
    navigate("/login", { replace: true });
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

        {/* BRAND */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="logo" />
          <span className="brand">Brand X Coffee</span>
        </Link>

        {/* BURGER */}
        <button
          className={`navbar-toggler ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        {/* ================= MOBILE ================= */}
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

          <div className="navbar-icons-mobile" ref={mobileDropdownRef}>

            {/* CART */}
            <button className="mobile-cart-btn" onClick={onBasketToggle}>
              <i className="fa-solid fa-bag-shopping"></i>
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* AUTH */}
            {!user ? (
              <Link
                to="/login"
                className="mobile-login-btn"
                onClick={() => setMenuOpen(false)}
              >
                Sign in / Register
              </Link>
            ) : (
              <div className="mobile-user-card">

                <div className="mobile-user-top">
                  <div className="mobile-avatar">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <div className="mobile-name">{user.name}</div>
                    <div className="mobile-email">{user.email}</div>
                  </div>
                </div>

                <div className="mobile-user-actions">

                  <Link
                    to="/profile"
                    className="mobile-action-btn"
                    onClick={() => setMenuOpen(false)}
                  >
                    View Profile
                  </Link>

                  <button
                    className="mobile-action-btn logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="navbar-icons" ref={desktopDropdownRef}>

          <button className="icon-btn basket-btn" onClick={onBasketToggle}>
            <i className="fa-solid fa-bag-shopping"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <div className="account-wrapper">

            <button
              className="icon-btn account-btn"
              onClick={() => setDesktopOpen(!desktopOpen)}
            >
              <i className="fa-solid fa-user"></i>
              {user && <span className="username">{user.name}</span>}
            </button>

            {desktopOpen && (
              <div className="account-dropdown">

                {user ? (
                  <>
                    <div className="dropdown-user">
                      <div className="avatar">
                        {user.name?.charAt(0)}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDesktopOpen(false)}
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
                  <Link to="/login" className="dropdown-item">
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