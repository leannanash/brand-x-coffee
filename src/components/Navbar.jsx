import React from "react";
import logo from "../assets/imgs/logo.jpg";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 fixed-top">
        <div className="container-fluid" style={{ paddingLeft: "20px" }}>
        <img className="logo" src={logo} alt="Brand X Coffee Logo" />
        <h2 className="brand">Brand X Coffee</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse nav-buttons" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {["Home", "Shop", "Blog", "Contact"].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <i className="fa-solid fa-bag-shopping" style={{ marginRight: "10px" }}></i>
              <i className="fa-solid fa-user"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
