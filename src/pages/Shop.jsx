import React, { useState, useEffect } from "react"; 
import Menu from "../components/FullMenu";
import BasketSidebar from "../components/BasketSideBar";

export default function Shop() {
  const categories = ["ALL", "ICED COFFEE", "NON-COFFEE (ICED)", "HOT COFFEE", "RICE MEALS", "BURGERS", "DESSERTS"];
  const [activeCategory, setActiveCategory] = useState("ALL");

  // --- Basket ---
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState(() => {
    return JSON.parse(localStorage.getItem("basket") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  const addItemToBasket = (item) => {
    setBasketItems(prev => {
      const existing = prev.find(i => i.title === item.title && i.size === item.size);
      if (existing) {
        return prev.map(i => i.title === item.title && i.size === item.size ? {...i, qty: i.qty + item.qty} : i);
      }
      return [...prev, item];
    });
    setBasketOpen(true);
  };

  const removeFromBasket = (index) => setBasketItems(prev => prev.filter((_, i) => i !== index));
  const updateQty = (index, qty) => setBasketItems(prev => prev.map((item, i) => i === index ? {...item, qty} : item));

  // --- Modal ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("12oz");

  const openModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price16oz ? "12oz" : "single");
    setModalOpen(true);
  };

  const getUnitPrice = () => {
    if (!selectedItem) return 0;
    return modalSize === "12oz" ? selectedItem.price12oz
         : modalSize === "16oz" ? selectedItem.price16oz
         : selectedItem.priceSingle ?? 0;
  };

  const totalPrice = getUnitPrice() * modalQty;

  const handleAddFromModal = () => {
    if (!selectedItem) return;
    addItemToBasket({
      ...selectedItem,
      price: getUnitPrice(),
      size: modalSize,
      qty: modalQty,
    });
    setModalOpen(false);
  };

  return (
    <section id="shop" className="shop-page position-relative">
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={removeFromBasket}
        onUpdateQty={updateQty}
        onCheckout={() => alert("Checkout coming soon ☕")}
      />

      <div className="container text-center mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-outline-warning mx-2 my-1 ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <Menu activeCategory={activeCategory} onOpenModal={openModal} />

      {/* --- Modal --- */}
      {modalOpen && selectedItem && (
        <div
          style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 9999
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-4 rounded"
            style={{ minWidth: "320px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>{selectedItem.title}</h5>

            {(selectedItem.price12oz || selectedItem.price16oz) && (
              <div className="mb-2">
                <label>Select Size:</label>
                <select
                  className="form-select"
                  value={modalSize}
                  onChange={e => setModalSize(e.target.value)}
                >
                  {selectedItem.price12oz && <option value="12oz">12oz (₱{selectedItem.price12oz})</option>}
                  {selectedItem.price16oz && <option value="16oz">16oz (₱{selectedItem.price16oz})</option>}
                </select>
              </div>
            )}

            <div className="mb-3">
              <label>Quantity:</label>
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setModalQty(q => Math.max(1, q - 1))}>-</button>
                <span>{modalQty}</span>
                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setModalQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="mb-3">
              <strong>Unit Price:</strong> ₱{getUnitPrice()} <br />
              <strong>Total:</strong> ₱{totalPrice}
            </div>

            <div className="text-end">
              <button className="btn btn-secondary me-2" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-warning" onClick={handleAddFromModal}>Add to Basket</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
