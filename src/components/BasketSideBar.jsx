import React from "react";

export default function BasketSidebar({
  isOpen,
  items = [],
  onClose,
  onRemove,
  onUpdateQty,
  onCheckout,
}) {
  // --- Helper to format price ---
  const formatPrice = (amount) => `₱${amount.toFixed(2)}`;

  // --- Calculate total ---
  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 0),
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="basket-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <aside className={`basket-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <header className="basket-header">
          <h4>Your Basket</h4>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            ×
          </button>
        </header>

        {/* Content */}
        <div className="basket-content">
          {items.length === 0 ? (
            <p className="empty-text">Your basket is empty ☕</p>
          ) : (
            items.map((item, index) => {
              const { image, title, size, price, qty } = item;
              return (
                <div className="basket-item" key={index}>
                  <img src={image} alt={title} />
                  <div className="item-info">
                    <h6>
                      {title} <span style={{ fontWeight: 400 }}>({size})</span>
                    </h6>

                  <div className="d-flex align-items-center">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(index, Math.max(1, item.qty - 1))}
                    >
                      -
                    </button>
                    <span className="mx-2 qty-display">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(index, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                    <span>
                      {formatPrice(price)} × {qty} = {formatPrice(price * qty)}
                    </span>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(index)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <footer className="basket-footer">
          <div className="total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button
            className="checkout-btn"
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
