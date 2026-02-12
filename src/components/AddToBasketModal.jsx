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

  // Determine available sizes
  const availableSizes = [];
  if (item.price_12oz) availableSizes.push({ label: "12oz", price: item.price_12oz });
  if (item.price_16oz) availableSizes.push({ label: "16oz", price: item.price_16oz });
  if (item.price_single) availableSizes.push({ label: "Single", price: item.price_single });

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
        {item.image_url && (
          <div className="modal-image-wrapper mb-3 text-center">
            <img
              src={item.image_url}
              alt={item.name}
              className="modal-image"
              style={{ maxHeight: 200, objectFit: "cover" }}
            />
          </div>
        )}

        {/* Product Name */}
        <h5 className="mb-3 text-center">{item.name}</h5>

        {/* Size Selector */}
        {availableSizes.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>
            <select
              className="form-select"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {availableSizes.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label} (₱{s.price})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity</label>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="fw-bold fs-4">{qty}</span>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="price-box mb-4 text-center">
          <div className="text-muted">Total</div>
          <div className="fs-4 fw-bold">₱{totalPrice}</div>
        </div>

        {/* Action Buttons */}
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
