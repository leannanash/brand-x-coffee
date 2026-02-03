import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-amber-600 text-white"
        : "text-gray-700 hover:bg-amber-100 hover:text-amber-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-amber-700">Brand X Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={linkClass}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            ☕ Products
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            🧾 Orders
          </NavLink>
          <NavLink to="/admin/inventory" className={linkClass}>
            📦 Inventory
          </NavLink>
        </nav>

        {/* Footer / User */}
        <div className="p-4 border-t">
          <button className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
