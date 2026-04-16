import React, { useState, useEffect } from "react"; 
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import BasketSideBar from "../components/BasketSideBar";
import CheckoutModal from "../components/Modals/CheckoutModal";
import ReceiptModal from "../components/Modals/ReceiptModal";
import { checkoutOrder } from "../utils/checkoutOrder";

export default function MainLayout() {
  const location = useLocation();

  // -------------------------
  // User state (syncs Header)
  // -------------------------
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" && stored !== "null" ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // Listen to storage changes (for multiple tabs)
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored && stored !== "undefined" && stored !== "null" ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // -------------------------
  // Basket state
  // -------------------------
  const basketKey = user ? `basket_${user.id}` : "basket_guest";
  const [basketItems, setBasketItems] = useState(() => {
    const saved = localStorage.getItem(basketKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [basketOpen, setBasketOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(basketKey, JSON.stringify(basketItems));
  }, [basketItems, basketKey]);

  const cartCount = basketItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // -------------------------
  // Modal states
  // -------------------------
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // -------------------------
  // Basket functions
  // -------------------------
  const addToBasket = (item) => {
    if (!item.id) return alert("Invalid product");
    setBasketItems((prev) => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + item.qty } : i);
      return [...prev, item];
    });
    setBasketOpen(true);
  };

  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) return;
    setBasketItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: newQty };
      return copy;
    });
  };

  const handleRemove = index => setBasketItems(prev => prev.filter((_, i) => i !== index));

  const handleCheckout = () => setCheckoutOpen(true);

  // -------------------------
  // Place order
  // -------------------------
  const handlePlaceOrder = async ({ customer_name, phone, email, address, items }) => {
    if (loadingCheckout) return;
    if (!items || !items.length) return alert("Basket is empty!");
    if (!customer_name || !phone) return alert("Name and phone are required!");

    const safeItems = items.filter(i => i.id);
    if (!safeItems.length) return alert("No valid items!");

    try {
      setLoadingCheckout(true);
      const payload = {
        customer_name,
        phone,
        email: email || null,
        address: address || null,
        items: safeItems.map(i => ({ product_id: i.id, size: i.size, qty: i.qty })),
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

  // -------------------------
  // Render
  // -------------------------
  return (
    <>
      <Header
        cartCount={cartCount}
        onBasketToggle={() => setBasketOpen(true)}
        user={user}
        setUser={setUser} // <-- Pass down for logout
        onLoginClick={() => setLoginOpen(true)}
      />

      <main>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} context={{ addToBasket, user, setUser }} />
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
        onOrderSuccess={formData => handlePlaceOrder({ ...formData, items: basketItems })}
      />

      <ReceiptModal
        open={receiptOpen}
        order={lastOrder}
        onClose={() => setReceiptOpen(false)}
      />

      <Footer />
    </>
  );
}