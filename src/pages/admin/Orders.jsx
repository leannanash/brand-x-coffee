import React from "react";

export default function Orders() {
  const orders = [
    { id: 1, customer: "Juan D.", total: 250, status: "Completed" },
    { id: 2, customer: "Maria S.", total: 180, status: "Preparing" },
    { id: 3, customer: "Alex P.", total: 420, status: "Completed" },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">🧾 Orders</h2>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Order List</h5>
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total (₱)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Completed"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
