import React, { useEffect } from "react";

export default function AddToBasketModal({
  open,
  item,
  qty,
  size,
  setQty,
  setSize,
  onClose,
  onAdd,
}) {
  if (!open || !item) return null;

  // Build size options
  const availableSizes = [];
  if (item.price12oz) availableSizes.push({ label: "12oz", price: item.price12oz });
  if (item.price16oz) availableSizes.push({ label: "16oz", price: item.price16oz });
  if (item.pricesingle) availableSizes.push({ label: "Single", price: item.pricesingle });

  // Auto set default size when modal opens
  useEffect(() => {
    if (availableSizes.length > 0 && !size) {
      setSize(availableSizes[0].label);
    }
  }, [item, availableSizes, size, setSize]);

  const selectedSize = availableSizes.find((s) => s.label === size);
  const unitPrice = selectedSize ? Number(selectedSize.price) : 0;
  const totalPrice = unitPrice * qty;

  const handleAddClick = () => {
    if (!selectedSize) return;

    onAdd({
      id: item.id,
      title: item.title,
      image: item.image_url,
      size: selectedSize.label,
      price: unitPrice,
      qty: qty,
    });

    // Reset modal state
    setQty(1);
    setSize("");
    onClose();
  };

  return (
    <div
      className="custom-modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="custom-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          maxWidth: 400,
          width: "90%",
          textAlign: "center",
        }}
      >
        {item.image_url && (
          <div className="mb-3">
            <img
              src={item.image_url}
              alt={item.title}
              style={{ maxHeight: 200, width: "100%", objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        )}

        <h5 className="mb-3">{item.title}</h5>

        {availableSizes.length > 0 && (
          <div className="mb-3 text-start">
            <label className="form-label">Size</label>
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

        <div className="mb-3 text-center">
          <label className="form-label">Quantity</label>
          <div className="d-flex justify-content-center gap-3 align-items-center">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="fs-4 fw-bold">{qty}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="text-center mb-4 fw-bold fs-5">
          Total: ₱{totalPrice.toFixed(2)}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light w-50" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-warning w-50" onClick={handleAddClick}>
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}