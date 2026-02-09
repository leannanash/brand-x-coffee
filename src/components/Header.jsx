import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.jpg";

export default function Header({ cartCount = 0, onBasketToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check login state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccountOpen(false);
    navigate("/login");
  };

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
          <div className="navbar-icons ms-auto d-flex align-items-center gap-2">
            {/* Cart */}
            <button
              className="icon-btn position-relative"
              aria-label="View basket"
              onClick={onBasketToggle}
            >
              <i className="fa-solid fa-bag-shopping"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {/* Account */}
            <div className="position-relative">
              <button
                className="icon-btn"
                aria-label="Account"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <i className="fa-solid fa-user"></i> Account
              </button>

              {accountOpen && (
                <div className="account-dropdown position-absolute end-0 mt-2 shadow bg-white p-2 rounded">
                  {user ? (
                    <>
                      <div className="dropdown-item text-muted">Logged in as</div>
                      <div className="dropdown-item fw-bold">{user.name}</div>
                      <hr className="my-1" />
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setAccountOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="dropdown-item text-danger"
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
      </div>
    </nav>
  );
}
