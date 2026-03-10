import React, { useState, useEffect } from "react";

export default function AddToBasketModal({ open, closing, item, onClose, onAdd }) {
  if (!open || !item) return null;

  const imageSrc = item.image || item.image_url || "";

  const availableSizes = [];
  if (item.price12oz != null) availableSizes.push({ label: "12oz", price: Number(item.price12oz) });
  if (item.price16oz != null) availableSizes.push({ label: "16oz", price: Number(item.price16oz) });
  if (item.pricesingle != null) availableSizes.push({ label: "Single", price: Number(item.pricesingle) });

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(availableSizes.length ? availableSizes[0].label : "");

  useEffect(() => {
    setQty(1);
    setSize(availableSizes.length ? availableSizes[0].label : "");
  }, [item]);

  const getPrice = () => {
    const map = {
      "12oz": Number(item.price12oz ?? 0),
      "16oz": Number(item.price16oz ?? 0),
      "Single": Number(item.pricesingle ?? 0),
    };
    return map[size] || 0;
  };

  const calcTotal = () => (getPrice() * qty).toLocaleString("en-PH", { style: "currency", currency: "PHP" });

  const handleAdd = () => {
    if (!item || !item.id) {
      console.error("Cannot add item: missing id", item);
      alert("Item is missing ID. Cannot add to basket.");
      return;
    }

    onAdd({
      id: item.id,
      title: item.title,
      image: item.image || item.image_url,
      size,
      price: getPrice(),
      qty,
    });

    onClose();
  };

  return (
    <div className={`custom-modal-backdrop ${closing ? "closing" : "open"}`} onClick={onClose}>
      <div className={`custom-modal ${closing ? "closing" : "open"}`} onClick={(e) => e.stopPropagation()}>
        {imageSrc && (
          <div className="modal-image-wrapper mb-3 text-center">
            <img src={imageSrc} alt={item.title} style={{ maxHeight: 220, width: "100%", objectFit: "cover", borderRadius: "10px" }} />
          </div>
        )}

        <h5 className="mb-3 text-center">{item.title}</h5>

        {availableSizes.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Size</label>
            <select className="form-select" value={size} onChange={(e) => setSize(e.target.value)}>
              {availableSizes.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label} ({s.price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity</label>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-outline-secondary" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="fw-bold fs-4">{qty}</span>
            <button className="btn btn-outline-secondary" onClick={() => setQty(q => q + 1)}>+</button>
          </div>
        </div>

        <div className="price-box mb-4 text-center">
          <div className="text-muted">Total</div>
          <div className="fs-4 fw-bold">{calcTotal()}</div>
        </div>

        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-light w-50" onClick={onClose}>Cancel</button>
          <button className="btn btn-warning w-50" onClick={handleAdd}>Add to Basket</button>
        </div>
      </div>
    </div>
  );
}