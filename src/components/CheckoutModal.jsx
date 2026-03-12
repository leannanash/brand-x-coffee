import React, { useState, useMemo } from "react";

export default function CheckoutModal({ open, items = [], onClose, onOrderSuccess, loading }) {
  if (!open) return null;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // ----------------------
  // Helper functions
  // ----------------------
  const formatPrice = (amount) => `₱${Number(amount).toFixed(2)}`;

  // subtotal, tax, total
  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 0), 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      return alert("Please fill Name & Phone");
    }
    if (!items.length) {
      return alert("Your basket is empty");
    }
    // pass form data to parent for processing
    onOrderSuccess({
      customer_name: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      address: form.address.trim() || null,
    });

    // optional: reset form after submission
    setForm({ fullName: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <h4>Checkout</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={form.fullName}
              onChange={handleChange}
              disabled={loading}
              required
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
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="order-summary mb-3">
            <h6>Order Summary</h6>

            {items.map((item, i) => (
              <div key={i} className="d-flex justify-content-between">
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
            <button
              type="button"
              className="btn btn-light w-50"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-warning w-50" disabled={loading}>
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}