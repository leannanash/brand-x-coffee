import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import AddToBasketModal from "../components/AddToBasketModal";
import BasketSidebar from "../components/BasketSideBar";
import { getProducts } from "../utils/products";

export default function Shop() {
  const [menuItems, setMenuItems] = useState([]);
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("basket") || "[]")
  );
  const [basketOpen, setBasketOpen] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setMenuItems(data);
      } catch {
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Persist basket
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  // ===== Basket Actions =====
  const handleAddToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
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

  const handleRemove = (index) => setBasketItems(prev => prev.filter((_, i) => i !== index));
  const handleUpdateQty = (index, qty) =>
    setBasketItems(prev => prev.map((item, i) => i === index ? { ...item, qty } : item));
  const handleCheckout = () => alert("Checkout coming soon ☕🛒");

  // ===== Modal Actions =====
  const openModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price12oz ? "12oz" : "Single");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="shop-page py-5">
      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      <div className="container">
        <div className="row g-4">
          {menuItems.map(item => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
              <MenuItem {...item} onOpenModal={() => openModal(item)} />
            </div>
          ))}
        </div>
      </div>

      <AddToBasketModal
        open={modalOpen}
        item={selectedItem}
        qty={modalQty}
        size={modalSize}
        setQty={setModalQty}
        setSize={setModalSize}
        onClose={closeModal}
        onAdd={handleAddToBasket}
      />
    </section>
  );
}