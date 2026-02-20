import React from "react";

export default function BasketSidebar({
  isOpen,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onCheckout,
}) {
  const formatPrice = (amount) => `₱${Number(amount).toFixed(2)}`;

  const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  return (
    <>
      {isOpen && (
        <div
          className="basket-overlay"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      <aside
        className={`basket-sidebar ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-400px",
          width: 350,
          height: "100%",
          background: "#fff",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
          zIndex: 999,
          transition: "right 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header className="basket-header" style={{ padding: 20, borderBottom: "1px solid #eee" }}>
          <h4>Your Basket</h4>
          <button onClick={onClose} style={{ float: "right", fontSize: 20, border: "none", background: "none" }}>×</button>
        </header>

        <div className="basket-content" style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {items.length === 0 ? (
            <p>Your basket is empty ☕</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${item.size}`} style={{ marginBottom: 15, borderBottom: "1px solid #eee", paddingBottom: 10 }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", maxHeight: 120, objectFit: "cover", borderRadius: 8 }} />
                <h6>{item.title} ({item.size})</h6>
                <div className="d-flex align-items-center gap-2">
                  <button onClick={() => onUpdateQty(index, Math.max(1, item.qty - 1))}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onUpdateQty(index, item.qty + 1)}>+</button>
                </div>
                <div>
                  {formatPrice(item.price)} × {item.qty} = {formatPrice(item.price * item.qty)}
                </div>
                <button onClick={() => onRemove(index)} style={{ color: "red", border: "none", background: "none" }}>Remove</button>
              </div>
            ))
          )}
        </div>

        <footer style={{ padding: 20, borderTop: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <strong>Total:</strong>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button
            className="btn btn-warning w-100"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            Checkout
          </button>
        </footer>
      </aside>
    </>
  );
}