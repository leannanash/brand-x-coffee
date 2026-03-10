import React from "react";

export default function BasketSideBar({
  isOpen,
  items = [],
  onClose,
  onRemove,
  onUpdateQty,
  onCheckout
}) {
  const formatPrice = (amount) => `₱${Number(amount).toFixed(2)}`;

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  return (
    <>
      {isOpen && <div className="basket-overlay" onClick={onClose} />}

      <aside className={`basket-sidebar ${isOpen ? "open" : ""}`}>
        <header className="basket-header">
          <h4>Your Basket</h4>
          <button onClick={onClose} className="close-btn">×</button>
        </header>

        <div className="basket-content">
          {items.length === 0 ? (
            <p className="empty-text">Your basket is empty ☕</p>
          ) : (
            items.map((item, index) => (
              <div className="basket-item" key={index}>
                <img src={item.image} alt={item.title} />

                <div className="item-info">
                  <h6>{item.title} ({item.size})</h6>

                  <div className="d-flex align-items-center mb-2">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        onUpdateQty(index, Math.max(1, item.qty - 1))
                      }
                    >
                      −
                    </button>

                    <span className="mx-2">{item.qty}</span>

                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(index, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <span>
                    {formatPrice(item.price)} × {item.qty} =
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemove(index)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

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