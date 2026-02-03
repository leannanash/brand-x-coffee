import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Today's Sales", value: "₱ 3,450" },
    { label: "Orders Today", value: "27" },
    { label: "Products", value: "42" },
    { label: "Low Stock Items", value: "3" },
  ];

  const recentOrders = [
    { id: 1, customer: "Juan D.", total: 250, status: "Completed" },
    { id: 2, customer: "Maria S.", total: 180, status: "Preparing" },
    { id: 3, customer: "Alex P.", total: 420, status: "Completed" },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      {/* Stats */}
      <div className="row mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-sm-6 col-md-3 mb-3">
            <div className="card shadow-sm p-3 h-100">
              <small className="text-muted">{stat.label}</small>
              <h4 className="mt-2 mb-0">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>₱ {order.total}</td>
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
