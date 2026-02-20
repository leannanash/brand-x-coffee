import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BasketSidebar from "../components/BasketSideBar";
import LoginModal from "../components/LoginModal";

export default function MainLayout() {
  const [basketOpen, setBasketOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem("basket");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }, [basketItems]);

  const cartCount = basketItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handleAddToBasket = (newItem) => {
    setBasketItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].qty += newItem.qty;
        return updated;
      }

      return [...prev, newItem];
    });

    setBasketOpen(true);
  };

  const handleUpdateQty = (index, newQty) => {
    setBasketItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemove = (index) => {
    setBasketItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleCheckout = () => {
    alert("Checkout coming soon ☕");
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onBasketToggle={() => setBasketOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
      />

      <main>
        <Outlet context={{ handleAddToBasket }} />
      </main>

      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      <LoginModal
        show={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}