import React from "react";

export default function ReceiptModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const formatPrice = (amount) => `₱${amount.toFixed(2)}`;
  const timestamp = new Date(order.created_at).toLocaleString();

  return (
    <div className="receipt-backdrop" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-center mb-2">☕ Brand X Coffee</h4>
        <p className="text-center mb-3">Order #: {order.id}</p>
        <p className="text-center mb-2">Date: {timestamp}</p>

        <div className="order-items mb-3">
          {order.items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between">
              <span>
                {item.title} ({item.size}) × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <hr />

        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Tax (12%)</span>
          <span>{formatPrice(order.tax)}</span>
        </div>

        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>

        <hr />
        <p>Customer: {order.customer?.fullName || "N/A"}</p>
        {order.customer?.phone && <p>Phone: {order.customer.phone}</p>}
        {order.customer?.email && <p>Email: {order.customer.email}</p>}
        {order.customer?.address && <p>Address: {order.customer.address}</p>}

        <button className="btn btn-primary w-100 mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}