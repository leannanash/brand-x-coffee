import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import AddToBasketModal from "../components/AddToBasketModal";
import { getProducts } from "../utils/products";

const splitFeatured = (items, featuredCount = 2) => ({
  featured: items.slice(0, featuredCount),
  others: items.slice(featuredCount),
});

export default function Shop() {
  const { addToBasket } = useOutletContext();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getProducts();
        setMenuItems(data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchMenu();
  }, []);

  // Open modal
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedItem(null);
    }, 200);
  };

  // Add from modal
  const handleAddFromModal = (item) => {
    addToBasket(item);
    closeModal();
  };

  const allCategories = [...new Set(menuItems.map((item) => item.category))];
  const categoriesToRender = activeCategory === "ALL" ? allCategories : [activeCategory];

  return (
    <section id="shop" className="shop-page py-5">
      {/* Hero */}
      <div className="shop-hero text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Our Cafe</h1>
        <p className="text-muted fs-5">Freshly brewed, tasty, and ready for you!</p>
      </div>

      {/* Categories */}
      <div className="category-bar bg-white shadow-sm py-3 mb-4">
        <div className="container text-center">
          <button
            className={`btn btn-outline-warning mx-2 ${activeCategory === "ALL" ? "active" : ""}`}
            onClick={() => setActiveCategory("ALL")}
          >
            ALL
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline-warning mx-2 ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
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
                  <div key={item.id} className="col-md-3">
                    <MenuItem {...item} onOpenModal={() => openModal(item)} featured />
                  </div>
                ))}
              </div>

              {others.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-secondary mb-3">More {cat}</h5>
                  <div className="row g-3">
                    {others.map((item) => (
                      <div key={item.id} className="col-md-3">
                        <MenuItem {...item} onOpenModal={() => openModal(item)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && selectedItem && (
        <AddToBasketModal
          open={modalOpen}
          closing={modalClosing}
          item={selectedItem}
          onClose={closeModal}
          onAdd={handleAddFromModal}
        />
      )}
    </section>
  );
}