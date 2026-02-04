import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Brand X Admin</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Orders
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
