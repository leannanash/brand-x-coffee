import React from "react";

export default function Inventory() {
  const inventory = [
    { id: 1, item: "Coffee Beans", quantity: 50, unit: "kg" },
    { id: 2, item: "Milk", quantity: 20, unit: "liters" },
    { id: 3, item: "Sugar", quantity: 15, unit: "kg" },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📦 Inventory</h2>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Stock List</h5>
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
