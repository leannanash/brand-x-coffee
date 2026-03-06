import React, { useState } from "react";

export default function CheckoutModal({ open, items, onClose, onPlaceOrder }) {
  if (!open) return null;

  const formatPrice = (amount) => `₱${amount.toFixed(2)}`;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
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
    if (!form.fullName.trim() || !form.phone.trim()) {
      alert("Please fill required fields.");
      return;
    }

    if (!items || items.length === 0) {
      alert("Your basket is empty!");
      return;
    }

    // Prepare payload to match backend
    const orderPayload = {
      customerName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      paymentMethod: form.paymentMethod,
      items: items.map((item) => ({
        id: item.id,
        title: item.title, // matches DB column
        size: item.size,
        price: item.price,
        qty: item.qty,
      })),
    };

    onPlaceOrder(orderPayload);

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
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            className="form-select"
            value={form.paymentMethod}
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
                {item.title} ({item.size}) × {item.qty}
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