import React from "react";
import logo from "../assets/imgs/logo.jpg";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 fixed-top shadow-sm" role="navigation" aria-label="Main Navigation">
      <div className="container" style={{ paddingLeft: "20px" }}>
        <a className="navbar-brand d-flex align-items-center" href="/" aria-label="Brand X Coffee Home">
          <img className="logo" src={logo} alt="Brand X Coffee Logo" />
          <h1 className="brand ms-2 mb-0">Brand X Coffee</h1>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Nav links aligned left */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            {["Home", "Menu", "Blog", "Contact"].map((page) => (
              <li key={page.toLowerCase()} className="nav-item">
                <a className="nav-link" href={`/${page.toLowerCase() === "home" ? "" : page.toLowerCase()}`}>
                  {page}
                </a>
              </li>
            ))}
          </ul>

          {/* Cart and user icons aligned right */}
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <button className="btn btn-link p-0" aria-label="View shopping cart">
                <i className="fa-solid fa-bag-shopping"></i>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link p-0" aria-label="User profile">
                <i className="fa-solid fa-user"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
