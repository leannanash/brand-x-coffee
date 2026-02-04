import React, { useState, useEffect } from "react";
import BasketSidebar from "../components/BasketSideBar";
import MenuItem from "../components/MenuItem";

const getMenu = () => {
  const saved = localStorage.getItem("menuData");
  return saved ? JSON.parse(saved) : [];
};

const splitFeatured = (items, featuredCount = 2) => ({
  featured: items.slice(0, featuredCount),
  others: items.slice(featuredCount),
});

export default function Shop() {
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
  const [menuItems, setMenuItems] = useState(getMenu());

  // Basket state
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("basket") || "[]")
  );

  

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "menuData") setMenuItems(getMenu());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  const addItemToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find(
        (i) => i.title === item.title && i.size === item.size
      );
      if (existing)
        return prev.map((i) =>
          i.title === item.title && i.size === item.size
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      return [...prev, item];
    });
    setBasketOpen(true);
  };

  const removeFromBasket = (index) =>
    setBasketItems((prev) => prev.filter((_, i) => i !== index));
  const updateQty = (index, qty) =>
    setBasketItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, qty } : item))
    );

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("12oz");

  const openModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price16oz ? "12oz" : "single");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedItem(null);
    }, 300); // match CSS animation duration
  };

  const getUnitPrice = () => {
    if (!selectedItem) return 0;
    return modalSize === "12oz"
      ? selectedItem.price12oz
      : modalSize === "16oz"
      ? selectedItem.price16oz
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
    closeModal();
  };

  const categoriesToRender =
    activeCategory === "ALL" ? categories.slice(1) : [activeCategory];

  return (
    <section id="shop" className="shop-page py-5">
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={removeFromBasket}
        onUpdateQty={updateQty}
        onCheckout={() => alert("Checkout coming soon ☕")}
      />

      <div className="shop-hero text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Our Cafe</h1>
        <p className="text-muted fs-5">
          Freshly brewed, tasty, and ready for you!
        </p>
      </div>

      <div className="category-bar sticky-top bg-white shadow-sm py-3 zindex-10 mb-4">
        <div className="container text-center">
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
      </div>

      <div className="container">
        {categoriesToRender.map((cat) => {
          const items = menuItems.filter((item) => item.category === cat);
          if (!items.length) return null;

          const { featured, others } = splitFeatured(items, 2);

          return (
            <div key={cat} className="menu-section mb-5">
              <h3 className="section-title mb-4">{cat}</h3>

              <div className="row g-4">
                {featured.map((item) => (
                  <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
                    <MenuItem
                      {...item}
                      onOpenModal={() => openModal(item)}
                      featured
                    />
                  </div>
                ))}
              </div>

              {others.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-secondary mb-3">More {cat}</h5>
                  <div className="row g-3">
                    {others.map((item) => (
                      <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
                        <MenuItem
                          {...item}
                          onOpenModal={() => openModal(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

{/* --- Modal --- */}
{modalOpen && selectedItem && (
  <div
    className={`modal-backdrop ${modalOpen ? "fade-in" : "fade-out"}`}
    onClick={() => setModalOpen(false)}
    style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 9999,
      transition: "opacity 0.3s ease"
    }}
  >
    <div
      className="bg-white p-4 rounded shadow-lg"
      style={{ minWidth: "320px" }}
      onClick={(e) => e.stopPropagation()} // important!
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
