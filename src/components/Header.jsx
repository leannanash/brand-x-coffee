import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";

export default function Header({ cartCount = 0, onBasketToggle, user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // -------------------------
  // Dropdown state
  // -------------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // -------------------------
  // Close dropdowns on outside click
  // -------------------------
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
        setDesktopOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------------------
  // Logout
  // -------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (setUser) setUser(null); // <-- Update parent
    setDesktopOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  // -------------------------
  // Navigation links
  // -------------------------
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // -------------------------
  // Render
  // -------------------------
  return (
    <nav className="navbar">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Brand Logo" className="logo" />
          <span className="brand">Brand X Coffee</span>
        </Link>

        {/* Mobile toggle */}
        <button className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Navigation links */}
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

          {/* Mobile icons */}
          <div className="navbar-icons-mobile" ref={mobileDropdownRef}>
            <button className="icon-btn basket-btn" onClick={onBasketToggle}>
              <i className="fa-solid fa-bag-shopping"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <div className="account-wrapper">
              <button className="account-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                <i className="fa-solid fa-user"></i>
                {user && <span className="username">{user.name}</span>}
              </button>

              {mobileOpen && (
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
                        onClick={() => setMobileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={() => setMobileOpen(false)}
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
            <button className="icon-btn account-btn" onClick={() => setDesktopOpen(!desktopOpen)}>
              <i className="fa-solid fa-user"></i>
              {user && <span className="username">{user.name}</span>}
            </button>

            {desktopOpen && (
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
                      onClick={() => setDesktopOpen(false)}
                    >
                      Profile
                    </Link>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setDesktopOpen(false)}
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