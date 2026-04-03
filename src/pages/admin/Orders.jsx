import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../utils/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      const formatted = data.map((order) => ({
        id: order.id,
        customer_name: order.customer_name || "Guest",
        phone: order.phone || "",
        email: order.email || "",
        address: order.address || "",
        total_amount: Number(order.total_amount || 0),
        status: order.status || "pending",
        created_at: order.created_at,
        items: order.items || [],
      }));

      setOrders(formatted);
    } catch {
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch {
      alert("Failed to update order status");
    }
  };

  // FILTER
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // PAGINATION CALCULATION
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const summary = {
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  if (loading)
    return <div className="text-center py-5">Loading orders...</div>;

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🧾 Orders Manager</h2>
      </div>

      {/* SUMMARY */}
      <div className="row mb-4">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="col-md-3 mb-2">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body py-3">
                <small className="text-muted text-uppercase">{key}</small>
                <h5 className="mb-0">{value}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTER */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search by customer or order #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      {paginatedOrders.length === 0 ? (
        <div className="text-center text-muted py-5">
          No orders found ☕
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th width="240">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>

                  <td>
                    <strong>{order.customer_name}</strong>
                    {order.phone && (
                      <div className="text-muted">📞 {order.phone}</div>
                    )}
                  </td>

                  <td style={{ maxWidth: 200 }}>
                    {order.items.length > 0
                      ? order.items.map((i, idx) => (
                          <div key={idx}>
                            {i.title} ({i.size}) × {i.qty}
                          </div>
                        ))
                      : "No items"}
                  </td>

                  <td>₱{order.total_amount.toFixed(2)}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.status === "pending"
                          ? "bg-secondary"
                          : order.status === "preparing"
                          ? "bg-warning text-dark"
                          : order.status === "ready"
                          ? "bg-info text-dark"
                          : "bg-success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "-"}
                  </td>

                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() =>
                          changeStatus(order.id, "preparing")
                        }
                      >
                        Preparing
                      </button>

                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => changeStatus(order.id, "ready")}
                      >
                        Ready
                      </button>

                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          changeStatus(order.id, "completed")
                        }
                      >
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      )}
    </div>
  );
}