import React, { useState, useEffect } from "react"; 
import { Outlet,useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
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
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const basketKey = user ? `basket_${user.id}` : "basket_guest";

  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem(basketKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist basket to localStorage
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
  // Place Order (only once)
  // ----------------------
  const handlePlaceOrder = async ({ customer_name, phone, email, address, items }) => {
    if (loadingCheckout) return; // prevent double submission
    if (!items || !items.length) return alert("Your basket is empty!");
    if (!customer_name || !phone) return alert("Name and phone are required!");

    const safeItems = items.filter((i) => i.id);
    if (!safeItems.length) return alert("No valid items in basket!");

    try {
      setLoadingCheckout(true);

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
        email,
        address,
      });

      // Clear basket immediately to prevent double checkout
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
        <AnimatePresence mode ="wait">
          <Outlet key={location.pathname} context={{ addToBasket }} />
        </AnimatePresence>
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
        loading={loadingCheckout}
        onClose={() => setCheckoutOpen(false)}
        onOrderSuccess={(formData) =>
          handlePlaceOrder({ ...formData, items: basketItems })
        }
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
      <Footer
       
      />
    </>
  );
}