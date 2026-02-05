import React from "react";

export default function AddToBasketModal({
  open,
  closing,
  item,
  qty,
  size,
  setQty,
  setSize,
  getUnitPrice,
  totalPrice,
  onClose,
  onAdd,
}) {
  if (!open || !item) return null;

  return (
    <div
      className={`custom-modal-backdrop ${closing ? "closing" : "open"}`}
      onClick={onClose}
    >
      <div
        className={`custom-modal ${closing ? "closing" : "open"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Preview */}
        {item.image && (
          <div className="modal-image-wrapper mb-3">
            <img src={item.image} alt={item.title} className="modal-image" />
          </div>
        )}

        <h5 className="mb-3 text-center">{item.title}</h5>

        {(item.price12oz || item.price16oz) && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>
            <select
              className="form-select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {item.price12oz && (
                <option value="12oz">12oz (₱{item.price12oz})</option>
              )}
              {item.price16oz && (
                <option value="16oz">16oz (₱{item.price16oz})</option>
              )}
            </select>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity</label>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="fw-bold fs-4">{qty}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="price-box mb-4 text-center">
          <div className="text-muted">Total</div>
          <div className="fs-4 fw-bold">₱{totalPrice}</div>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-light w-50" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-warning w-50" onClick={onAdd}>
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
