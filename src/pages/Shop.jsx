import React, { useState, useEffect } from "react";
import Menu from "../components/FullMenu";
import BasketSidebar from "../components/BasketSideBar";

export default function Shop({ addToBasket }) {
  const categories = [
    "ALL",
    "ICED COFFEE",
    "NON-COFFEE (ICED)",
    "HOT COFFEE",
    "RICE MEALS",
    "BURGERS",
    "DESSERTS",
  ];

  const [activeCategory, setActiveCategory] = useState("ALL");

  // --- Basket State ---
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState(() => {
    // load from localStorage
    return JSON.parse(localStorage.getItem("basket") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  const addItemToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find(
        (i) => i.title === item.title && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.title === item.title && i.size === item.size
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, item];
    });
    setBasketOpen(true);
  };

  const removeFromBasket = (index) => {
    setBasketItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, qty) => {
    setBasketItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, qty } : item))
    );
  };

  // --- Modal State ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("12oz");

  const openModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price12oz ? "12oz" : "single");
    setModalOpen(true);
  };

  const handleAddFromModal = () => {
    if (!selectedItem) return;
    const price =
      modalSize === "12oz"
        ? selectedItem.price12oz
        : modalSize === "16oz"
        ? selectedItem.price16oz
        : selectedItem.priceSingle ?? 0;

    addItemToBasket({
      ...selectedItem,
      price,
      size: modalSize,
      qty: modalQty,
    });
    setModalOpen(false);
  };

  return (
    <section id="shop" className="shop-page position-relative">
      {/* Basket Sidebar */}
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={removeFromBasket}
        onQtyChange={updateQty}
        onCheckout={() => alert("Checkout coming soon ☕")}
      />

      {/* Hero Banner */}
      <div className="shop-hero position-relative mb-5">
        <div className="shop-overlay" />
        <div
          className="container text-center text-white position-relative"
          style={{ zIndex: 2 }}
        >
          <h2 className="shop-title animate-fadeInUp">Our Menu</h2>
          <p className="shop-subtitle animate-fadeInUp">
            Handcrafted coffee, meals, and desserts made with love
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="container text-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-outline-warning mx-2 my-1 ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Full Menu */}
      <div className="container">
        <Menu
          activeCategory={activeCategory}
          onAddToBasket={openModal} // now triggers centralized modal
        />
      </div>

      {/* --- Modal --- */}
      {modalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <h5>{selectedItem.title}</h5>

            {/* Size Selection */}
            {selectedItem.price12oz && (
              <div className="mb-2">
                <label>Select Size:</label>
                <select
                  className="form-select"
                  value={modalSize}
                  onChange={(e) => setModalSize(e.target.value)}
                >
                  <option value="12oz">12oz (₱{selectedItem.price12oz})</option>
                  <option value="16oz">16oz (₱{selectedItem.price16oz})</option>
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-3">
              <label>Quantity:</label>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span>{modalQty}</span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() => setModalQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-warning" onClick={handleAddFromModal}>
                Add to Basket
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
