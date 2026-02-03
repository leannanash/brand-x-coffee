import React from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Espresso", price: 120, stock: 20 },
    { id: 2, name: "Latte", price: 150, stock: 15 },
    { id: 3, name: "Cappuccino", price: 130, stock: 10 },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">☕ Products</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Product List</h5>
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price (₱)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
