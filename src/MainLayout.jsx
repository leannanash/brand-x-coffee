import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BasketSidebar from "./components/BasketSideBar";

export default function MainLayout({ children }) {
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);


  const toggleBasket = () => {
    setBasketOpen(prev => !prev);
  };

  return (
    <>
      <Header
        onBasketToggle={toggleBasket}
        cartCount={0} // we’ll wire this next
      />

      <BasketSidebar
        isOpen={basketOpen}
        onClose={toggleBasket}
        items={basketItems}
      />


      <main style={{ minHeight: "80vh" }}>
        {children}
      </main>

      <Footer />
    </>
  );
}
