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

  const cartCount = basketItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  const handleUpdateQty = (index, newQty) => {
    setBasketItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: newQty };
      return copy;
    });
  };

  const handleRemove = (index) => {
    setBasketItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    alert("Checkout coming soon ☕🛒");
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onBasketToggle={() => setBasketOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
      />

      <main style={{ minHeight: "calc(100vh - 70px)" }}>
        <Outlet />
      </main>

      <BasketSidebar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      <LoginModal show={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
