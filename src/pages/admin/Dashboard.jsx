import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    pending: 0,
    preparing: 0,
    completed: 0,
  });
  const [bestSellers, setBestSellers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await apiFetch("/dashboard");

      // ===== STATS =====
      setStats([
        {
          label: "Today's Sales",
          value: `₱ ${Number(data?.stats?.todays_sales || 0).toFixed(2)}`,
          color: "success",
        },
        {
          label: "Orders Today",
          value: Number(data?.stats?.orders_today || 0),
          color: "primary",
        },
        {
          label: "Avg Order Value",
          value: `₱ ${Number(data?.stats?.avg_order_value || 0).toFixed(2)}`,
          color: "warning",
        },
        {
          label: "Menu Items",
          value: Number(data?.stats?.menu_items || 0),
          color: "dark",
        },
      ]);

      // ===== ORDER SUMMARY =====
      const summary = {
        pending: 0,
        preparing: 0,
        completed: 0,
      };

      (data?.orderSummary || []).forEach((s) => {
        if (!s?.status) return;

        const key = s.status.toLowerCase();

        if (summary.hasOwnProperty(key)) {
          summary[key] = Number(s.count || 0);
        }
      });

      setOrderSummary(summary);

      // ===== BEST SELLERS =====
      setBestSellers(Array.isArray(data?.bestSellers) ? data.bestSellers : []);

      // ===== RECENT ORDERS =====
      setRecentOrders(Array.isArray(data?.recentOrders) ? data.recentOrders : []);

    } catch (err) {
      console.error("Dashboard error:", err.message);

      setStats([]);
      setBestSellers([]);
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // helper for badge color
  const getStatusBadge = (status = "") => {
    const s = status.toLowerCase();

    if (s === "completed") return "bg-success";
    if (s === "preparing") return "bg-warning text-dark";
    if (s === "pending") return "bg-secondary";

    return "bg-dark";
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <h2 className="mb-4">📊 Admin Dashboard</h2>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      {/* QUICK ACTIONS */}
      <div className="mb-4 d-flex gap-2 flex-wrap">
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/products?mode=create")}
        >
          + Add Product
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/admin/orders")}
        >
          View Orders
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/products")}
        >
          Manage Menu
        </button>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-sm-6 col-md-3 mb-3">
            <div className={`card shadow-sm border-0 bg-${stat.color} text-white h-100`}>
              <div className="card-body">
                <small className="opacity-75">{stat.label}</small>
                <h4 className="mt-2 mb-0">{stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER STATUS + BEST SELLERS */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h6 className="mb-0">Order Status</h6>
            </div>
            <div className="card-body">
              <p>🕒 Pending: <strong>{orderSummary.pending}</strong></p>
              <p>👨‍🍳 Preparing: <strong>{orderSummary.preparing}</strong></p>
              <p>✅ Completed: <strong>{orderSummary.completed}</strong></p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h6 className="mb-0">Top Selling Drinks</h6>
            </div>
            <div className="card-body">
              {bestSellers.length === 0 ? (
                <p className="text-muted">No data yet</p>
              ) : (
                bestSellers.map((item, i) => (
                  <p key={i}>
                    ☕ {item.name} — <strong>{item.count}</strong>
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h6 className="mb-0">Peak Hours</h6>
            </div>
            <div className="card-body">
              <p>🔥 9:00 AM – 11:00 AM</p>
              <small className="text-muted">
                Highest order volume today
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No recent orders
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>₱ {Number(order.total || 0).toFixed(2)}</td>
                    <td>
                      {order?.created_at
                        ? new Date(order.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}