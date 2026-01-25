import React, { useState } from "react";
import Menu from "../components/FullMenu";

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

  return (
    <section id="shop" className="shop-page">
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
        <Menu activeCategory={activeCategory} />
      </div>
    </section>
  );
}
