import React, { useState } from "react";
import Menu from "../components/FullMenu";
import BasketSidebar from "../components/BasketSideBar";

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
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  /* ---------------- ADD TO BASKET ---------------- */
  const addToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find((i) => i.title === item.title);
      if (existing) {
        return prev.map((i) =>
          i.title === item.title ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setBasketOpen(true); // auto open for UX
  };  

  const removeFromBasket = (index) => {
    setBasketItems((items) => items.filter((_, i) => i !== index));
  };

  return (
    <section id="shop" className="shop-page position-relative">


      {/* Basket Sidebar */}
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={removeFromBasket}
        onCheckout={() => alert("Checkout coming soon ☕")}
      />

      {/* Hero Banner */}
      <div className="shop-hero position-relative mb-5">
        <div className="shop-overlay" />
        <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
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
          onAddToBasket={addToBasket}
        />
      </div>
    </section>
  );
}
