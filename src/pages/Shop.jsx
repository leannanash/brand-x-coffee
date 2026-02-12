import React, { useState, useEffect } from "react";
import BasketSidebar from "../components/BasketSideBar";
import MenuItem from "../components/MenuItem";
import AddToBasketModal from "../components/AddToBasketModal";
import { getProducts } from "../utils/products";

const splitFeatured = (items, featuredCount = 2) => ({
  featured: items.slice(0, featuredCount),
  others: items.slice(featuredCount),
});

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [menuItems, setMenuItems] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("basket") || "[]")
  );

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("12oz");

  // Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getProducts();
        setMenuItems(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchMenu();
  }, []);

  // Persist basket in localStorage
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  // ===== BASKET ACTIONS =====
  const addItemToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
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

  // ===== MODAL ACTIONS =====
  const openModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price_12oz ? "12oz" : "single");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedItem(null);
    }, 250);
  };

  const getUnitPrice = () => {
    if (!selectedItem) return 0;
    if (modalSize === "12oz") return selectedItem.price_12oz ?? 0;
    if (modalSize === "16oz") return selectedItem.price_16oz ?? 0;
    return selectedItem.price_single ?? 0;
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

  // Dynamic categories from products
  const categoriesToRender =
    activeCategory === "ALL"
      ? [...new Set(menuItems.map((item) => item.category))]
      : [activeCategory];

  return (
    <section id="shop" className="shop-page py-5">
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={removeFromBasket}
        onUpdateQty={updateQty}
        onCheckout={() => alert("Checkout not implemented")}
      />

      <div className="shop-hero text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Our Cafe</h1>
        <p className="text-muted fs-5">
          Freshly brewed, tasty, and ready for you!
        </p>
      </div>

      <div className="category-bar bg-white shadow-sm py-3 zindex-10 mb-4">
        <div className="container text-center">
          {categoriesToRender.map((cat) => (
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
                    <MenuItem {...item} onOpenModal={() => openModal(item)} featured />
                  </div>
                ))}
              </div>

              {others.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-secondary mb-3">More {cat}</h5>
                  <div className="row g-3">
                    {others.map((item) => (
                      <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
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

      <AddToBasketModal
        open={modalOpen}
        closing={modalClosing}
        item={selectedItem}
        qty={modalQty}
        size={modalSize}
        setQty={setModalQty}
        setSize={setModalSize}
        getUnitPrice={getUnitPrice}
        totalPrice={totalPrice}
        onClose={closeModal}
        onAdd={handleAddFromModal}
      />
    </section>
  );
}
