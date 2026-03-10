import React, { useState } from "react";
import { checkoutOrder } from "../utils/checkoutOrder";

export default function CheckoutModal({ open, items = [], onClose, onOrderSuccess }) {
  if (!open) return null;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const formatPrice = (amount) => `₱${Number(amount).toFixed(2)}`;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.phone.trim()) {
      return alert("Please fill Name & Phone");
    }

    if (!items.length) {
      return alert("Your basket is empty");
    }

    const cleanItems = items.map((item) => ({
      product_id: item.id,
      size: item.size,
      qty: Number(item.qty),
    }));

    const payload = {
      customer_name: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      address: form.address.trim() || null,
      items: cleanItems,
    };

    try {
      setLoading(true);

      const result = await checkoutOrder(payload);

      if (onOrderSuccess) {
        onOrderSuccess(result);
      }

      onClose();
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-3">Checkout</h4>

        <div className="mb-3">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={form.fullName}
            onChange={handleChange}
            disabled={loading}
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
            className="btn btn-light w-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-warning w-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}