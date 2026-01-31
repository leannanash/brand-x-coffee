import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BasketSidebar from "./components/BasketSideBar";

export default function MainLayout({ children }) {
  // Load basket from localStorage
  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem("basketItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [basketOpen, setBasketOpen] = useState(false);

  // Persist basket whenever it changes
  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }, [basketItems]);

  const toggleBasket = () => setBasketOpen(prev => !prev);

  const addToBasket = (item) => {
    setBasketItems(prev => {
      const existing = prev.find(i => i.title === item.title && i.size === item.size);
      if (existing) {
        return prev.map(i =>
          i.title === item.title && i.size === item.size
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, { ...item }];
    });
    setBasketOpen(true);
  };

  const removeFromBasket = (index) =>
    setBasketItems(prev => prev.filter((_, i) => i !== index));

  const updateQty = (index, qty) =>
    setBasketItems(prev =>
      prev.map((item, i) => i === index ? { ...item, qty } : item)
    );

  return (
    <>
      <Header
        onBasketToggle={toggleBasket}
        cartCount={basketItems.reduce((sum, i) => sum + i.qty, 0)}
      />

      <BasketSidebar
        isOpen={basketOpen}
        onClose={toggleBasket}
        items={basketItems}
        onRemove={removeFromBasket}
        onUpdateQty={updateQty}
      />

      <main style={{ minHeight: "80vh" }}>
        {React.cloneElement(children, { addToBasket })}
      </main>

      <Footer />
    </>
  );
}
