import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BasketSideBar from "../components/BasketSideBar";
import LoginModal from "../components/LoginModal";
import CheckoutModal from "../components/CheckoutModal";
import ReceiptModal from "../components/ReceiptModal";
import { checkoutOrder } from "../utils/checkoutOrder";

export default function MainLayout() {
  const [basketOpen, setBasketOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const basketKey = user ? `basket_${user.id}` : "basket_guest";

  // Basket state
  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem(basketKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist basket whenever it changes
  useEffect(() => {
    localStorage.setItem(basketKey, JSON.stringify(basketItems));
  }, [basketItems, basketKey]);

  // Cart count for header
  const cartCount = basketItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // Add item to basket
  const addToBasket = (item) => {
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

  // Update quantity
  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) return;
    setBasketItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: newQty };
      return copy;
    });
  };

  // Remove item
  const handleRemove = (index) => {
    setBasketItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Open checkout modal
  const handleCheckout = () => setCheckoutOpen(true);

  // Place order
  const handlePlaceOrder = async ({ items }) => {
    if (!items || items.length === 0) {
      alert("Your basket is empty!");
      return;
    }

    try {
      // Send items to backend
      const response = await checkoutOrder({ items });

      // Prepare receipt
      const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const tax = subtotal * 0.12;
      const total = subtotal + tax;
      const user = JSON.parse(localStorage.getItem("user")|| "null");

      setLastOrder({
        id: response.orderId,
        items,
        subtotal,
        tax,
        total,
        created_at: new Date(),
        customer: user,
      });

      // Clear basket for this user
      setBasketItems([]);
      setBasketOpen(false);
      setCheckoutOpen(false);
      setReceiptOpen(true);

      console.log("ORDER RESPONSE:", response);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onBasketToggle={() => setBasketOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
      />

      <main>
        <Outlet context={{ addToBasket }} />
      </main>

      <BasketSideBar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={basketItems}
        onClose={() => setCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <ReceiptModal
        open={receiptOpen}
        order={lastOrder}
        onClose={() => setReceiptOpen(false)}
      />

      <LoginModal
        show={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
}