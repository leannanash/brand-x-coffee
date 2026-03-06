import React, { useState, useEffect } from "react";

export default function AddToBasketModal({ open, closing, item, onClose, onAdd }) {
  if (!open || !item) return null;

  const imageSrc = item.image || item.image_url || "";

  const availableSizes = [];
if (item.price12oz != null)
  availableSizes.push({ label: "12oz", price: item.price12oz });
if (item.price16oz != null)
  availableSizes.push({ label: "16oz", price: item.price16oz });
if (item.pricesingle != null)
  availableSizes.push({ label: "Single", price: item.pricesingle });

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(
    item.price12oz ? "12oz" : item.price16oz ? "16oz" : "Single"
  );

  useEffect(() => {
    setQty(1);
    setSize(item.price12oz ? "12oz" : item.price16oz ? "16oz" : "Single");
  }, [item]);

  useEffect(() => {
  console.log("ITEM:", item);
}, [item]);

const getPrice = () => {
  const map = {
    "12oz": item.price12oz,
    "16oz": item.price16oz,
    "Single": item.pricesingle,
  };
  return Number(map[size]) || 0;
};

  const calcTotal = () => {
    const price = getPrice();
    return (price * qty).toFixed(2);
  };

  const handleAdd = () => {
    const price = getPrice();

    onAdd({
      id: item.id,
      title: item.title,
      image: item.image || item.image_url,
      size,
      price,
      qty,
    });

    onClose();
  };

  return (
    <div className={`custom-modal-backdrop ${closing ? "closing" : "open"}`} onClick={onClose}>
      <div className={`custom-modal ${closing ? "closing" : "open"}`} onClick={(e) => e.stopPropagation()}>
        {imageSrc && (
          <div className="modal-image-wrapper mb-3 text-center">
            <img
              src={imageSrc}
              alt={item.title}
              style={{ maxHeight: 220, width: "100%", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        )}

        <h5 className="mb-3 text-center">{item.title}</h5>

        {availableSizes.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>
            <select className="form-select" value={size} onChange={(e) => setSize(e.target.value)}>
              {availableSizes.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label} (₱{s.price})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity</label>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-secondary" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="fw-bold fs-4">{qty}</span>
            <button className="btn btn-outline-secondary" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
        </div>

        <div className="price-box mb-4 text-center">
          <div className="text-muted">Total</div>
          <div className="fs-4 fw-bold">₱{calcTotal()}</div>
        </div>

        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-light w-50" onClick={onClose}>Cancel</button>
          <button className="btn btn-warning w-50" onClick={handleAdd}>Add to Basket</button>
        </div>
      </div>
    </div>
  );
}