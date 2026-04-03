import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f5f2" }}>

      {/* SIDEBAR */}
      <aside
        className="d-flex flex-column justify-content-between p-3"
        style={{
          width: "250px",
          background: "linear-gradient(180deg, #3e2723, #5d4037)",
          color: "#fff"
        }}
      >
        {/* TOP */}
        <div>
          <h4 className="mb-4 fw-bold">☕ Brand X</h4>

          <nav className="d-flex flex-column gap-2">

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `btn text-start ${
                  isActive
                    ? "btn-light text-dark fw-semibold"
                    : "btn-outline-light"
                }`
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `btn text-start ${
                  isActive
                    ? "btn-light text-dark fw-semibold"
                    : "btn-outline-light"
                }`
              }
            >
              ☕ Products
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `btn text-start ${
                  isActive
                    ? "btn-light text-dark fw-semibold"
                    : "btn-outline-light"
                }`
              }
            >
              🧾 Orders
            </NavLink>

          </nav>
        </div>

        {/* LOGOUT */}
        <div>
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ minWidth: 0 }} // 🔥 IMPORTANT FIX
      >

        {/* HEADER */}
        <header
          className="d-flex justify-content-between align-items-center px-4"
          style={{
            height: "70px",
            background: "#fff",
            borderBottom: "1px solid #eee"
          }}
        >
          <h5 className="mb-0">Admin Panel</h5>

          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">Admin</span>
            <div
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                background: "#c7b299"
              }}
            />
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-4" style={{ maxWidth: "1800px", width: "100%" }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}