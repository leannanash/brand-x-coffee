import React from "react";

export default function ReceiptModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const formatPrice = (amount) => `₱${Number(amount).toFixed(2)}`;

  const timestamp = order.created_at
    ? new Date(order.created_at).toLocaleString()
    : "";

  const subtotal = order.items?.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  ) || 0;

  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <div className="receipt-backdrop" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-center mb-2">☕ Brand X Coffee</h4>
        <p className="text-center mb-1">Order #: {order.id}</p>
        <p className="text-center mb-3">Date: {timestamp}</p>

        <div className="order-items mb-3">
          {order.items?.length > 0 ? (
            order.items.map((item, index) => (
              <div key={index} className="d-flex justify-content-between">
                <span>
                  {item.title} ({item.size}) × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))
          ) : (
            <div>No items</div>
          )}
        </div>

        <hr />

        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Tax (12%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <hr />

        <p><strong>Customer:</strong> {order.customer_name || "Guest"}</p>
        {order.phone && <p>Phone: {order.phone}</p>}
        {order.email && <p>Email: {order.email}</p>}
        {order.address && <p>Address: {order.address}</p>}

        <button className="btn btn-primary w-100 mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}