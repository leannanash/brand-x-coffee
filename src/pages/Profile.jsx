import React, { useEffect, useState } from "react";
import { getOrders } from "../utils/orders";

export default function Profile({ user: parentUser }) {
  const [user, setUser] = useState(parentUser || null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});

  // Listen for login/logout across tabs
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored && stored !== "undefined" && stored !== "null" ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoadingOrders(true);
      try {
        const data = await getOrders();
        const userOrders = data.filter(
          (o) =>
            (o.email || "").toLowerCase() === (user.email || "").toLowerCase() ||
            (o.customer_name || "").toLowerCase() === (user.name || "").toLowerCase()
        );
        const formatted = userOrders.map((order) => ({
          id: order.id,
          items: order.items || [],
          total_amount: Number(order.total_amount || 0),
          status: order.status || "pending",
          created_at: order.created_at,
        }));
        setOrders(formatted);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [user]);

  const toggleOrder = (id) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h3>Please login to view your profile</h3>
      </div>
    );
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">{initial}</div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        <div className="profile-info">
          <div className="info-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>
          <div className="info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div className="info-row">
            <span>Account Type</span>
            <strong>{user.role || "Customer"}</strong>
          </div>
        </div>

        <button className="profile-btn" onClick={() => alert("Edit profile coming soon!")}>
          Edit Profile
        </button>

        <div className="profile-orders">
          <h3>Order History</h3>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td>#{order.id}</td>
                        <td>₱{order.total_amount.toFixed(2)}</td>
                        <td>
                          <span className={`badge status-${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {order.created_at
                            ? new Date(order.created_at).toLocaleString()
                            : "No Date"}
                        </td>
                        <td>
                          <button
                            className="details-btn"
                            onClick={() => toggleOrder(order.id)}
                          >
                            {expandedOrders[order.id] ? "Hide Items" : "View Items"}
                          </button>
                        </td>
                      </tr>
                      {expandedOrders[order.id] && (
                        <tr className="order-items-row">
                          <td colSpan="5">
                            <ul className="order-items-list">
                              {order.items.length > 0 ? (
                                order.items.map((i, idx) => (
                                  <li key={idx}>
                                    {i.title} ({i.size}) × {i.qty}
                                  </li>
                                ))
                              ) : (
                                <li>No items</li>
                              )}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}