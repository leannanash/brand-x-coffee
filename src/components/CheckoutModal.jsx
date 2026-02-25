import React, { useState } from "react";

export default function CheckoutModal({ open, items, onClose, onPlaceOrder }) {
  if (!open) return null;

  const formatPrice = (amount) => `₱${amount.toFixed(2)}`;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const taxRate = 0.12;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.phone) {
      alert("Please fill required fields.");
      return;
    }

    onPlaceOrder({
      customer: form,
      items,
      subtotal,
      tax,
      total,
    });

    onClose();
  };

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-3">Checkout</h4>

        {/* Billing Form */}
        <div className="mb-3">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            className="form-select"
            onChange={handleChange}
          >
            <option>Cash</option>
            <option>GCash</option>
            <option>Card</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="order-summary mb-3">
          <h6>Order Summary</h6>

          {items.map((item, index) => (
            <div key={index} className="d-flex justify-content-between">
              <span>
                {item.name} ({item.size}) × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}

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
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light w-50" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-warning w-50" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}