import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../utils/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  if (loading) return <div className="text-center py-5">Loading orders...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Orders Manager</h2>

      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>

              <td>
                {order.customer_name || "Guest"}
              </td>

              <td>
                {order.items?.map((i, index) => (
                  <div key={index}>
                    {i.title} ({i.size}) x{i.qty}
                  </div>
                ))}
              </td>

              <td>₱{order.total}</td>

              <td>
                <span className={`badge 
                  ${order.status === "pending" ? "bg-secondary" :
                    order.status === "preparing" ? "bg-warning" :
                    order.status === "ready" ? "bg-info" :
                    order.status === "completed" ? "bg-success" :
                    "bg-danger"
                  }`}>
                  {order.status}
                </span>
              </td>

              <td>
                {new Date(order.created_at).toLocaleString()}
              </td>

              <td>
                <div className="d-flex gap-2 flex-wrap">

                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => changeStatus(order.id, "preparing")}
                  >
                    Preparing
                  </button>

                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => changeStatus(order.id, "ready")}
                  >
                    Ready
                  </button>

                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => changeStatus(order.id, "completed")}
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
  );
}