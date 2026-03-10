import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BasketSideBar from "../components/BasketSideBar";
import LoginModal from "../components/LoginModal";
import CheckoutModal from "../components/CheckoutModal";
import ReceiptModal from "../components/ReceiptModal";
import { checkoutOrder } from "../utils/checkoutOrder";

export default function MainLayout() {
  // ----------------------
  // States
  // ----------------------
  const [basketOpen, setBasketOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // ----------------------
  // Basket (localStorage)
  // ----------------------
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const basketKey = user ? `basket_${user.id}` : "basket_guest";

  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem(basketKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(basketKey, JSON.stringify(basketItems));
  }, [basketItems, basketKey]);

  const cartCount = basketItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // ----------------------
  // Basket Functions
  // ----------------------
  const addToBasket = (item) => {
    if (!item.id) return alert("Invalid product, cannot add to basket.");
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

  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) return;
    setBasketItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: newQty };
      return copy;
    });
  };

  const handleRemove = (index) =>
    setBasketItems((prev) => prev.filter((_, i) => i !== index));

  const handleCheckout = () => setCheckoutOpen(true);

  // ----------------------
  // Place Order
  // ----------------------
  const handlePlaceOrder = async ({ customer_name, phone, email, address, items }) => {
    if (!items || !items.length) {
      return alert("Your basket is empty!");
    }
    if (!customer_name || !phone) {
      return alert("Name and phone are required!");
    }

    // Filter items with valid id only
    const safeItems = items.filter((i) => i.id);
    if (!safeItems.length) return alert("No valid items in basket!");

    try {
      setLoadingCheckout(true);

      // Send to backend (total computed server-side)
      const payload = {
        customer_name,
        phone,
        email: email || null,
        address: address || null,
        items: safeItems.map((i) => ({
          product_id: i.id,
          size: i.size,
          qty: i.qty,
        })),
      };

      const response = await checkoutOrder(payload);

      // Compute subtotal, tax, total locally for receipt
      const subtotal = safeItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      const tax = subtotal * 0.12;
      const total = subtotal + tax;

      setLastOrder({
        id: response.id || response.orderId,
        items: safeItems,
        subtotal,
        tax,
        total,
        created_at: new Date(),
        customer_name,
        phone,
      });

      // Clear basket and modals
      setBasketItems([]);
      setBasketOpen(false);
      setCheckoutOpen(false);
      setReceiptOpen(true);
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err?.message || "Failed to place order");
    } finally {
      setLoadingCheckout(false);
    }
  };

  // ----------------------
  // Render
  // ----------------------
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
        onOrderSuccess={(result) => handlePlaceOrder({
          customer_name: result.customer_name,
          phone: result.phone,
          email: result.email,
          address: result.address,
          items: basketItems
        })}
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