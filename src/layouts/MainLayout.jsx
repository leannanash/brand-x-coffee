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
  // Auth state
  // -------------------------
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ✅ Restore + validate user on refresh
 useEffect(() => {
  const initAuth = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }
      try {
        const userData = await getMe();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

  initAuth();
}, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // -------------------------
  // Basket (safe with user)
  // -------------------------
  const basketKey = user ? `basket_${user.id}` : "basket_guest";

  const [basketItems, setBasketItems] = useState([]);

  // Load basket AFTER auth ready
  useEffect(() => {
    if (authLoading) return;

    const saved = localStorage.getItem(basketKey);
    setBasketItems(saved ? JSON.parse(saved) : []);
  }, [basketKey, authLoading]);

  useEffect(() => {
    if (!authLoading) {
      localStorage.setItem(basketKey, JSON.stringify(basketItems));
    }
  }, [basketItems, basketKey, authLoading]);

  const [basketOpen, setBasketOpen] = useState(false);

  const cartCount = basketItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // -------------------------
  // Basket functions
  // -------------------------
  const addToBasket = (item) => {
    if (!item.id) return alert("Invalid product");

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

  // -------------------------
  // Checkout
  // -------------------------
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handlePlaceOrder = async ({ customer_name, phone, email, address, items }) => {
    if (loadingCheckout) return;

    try {
      setLoadingCheckout(true);

      const response = await checkoutOrder({
        customer_name,
        phone,
        email,
        address,
        items,
      });

      setLastOrder({
        id: response.id,
        items,
        created_at: new Date(),
      });

      setBasketItems([]);
      setCheckoutOpen(false);
      setReceiptOpen(true);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
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
        setUser={setUser}
      />

      <main>
        <AnimatePresence mode="wait">
          <Outlet
            key={location.pathname}
            context={{ user, setUser, authLoading, addToBasket }}
          />
        </AnimatePresence>
      </main>

      <BasketSideBar
        isOpen={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
        onCheckout={() => setCheckoutOpen(true)}
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

      <Footer />
    </>
  );
}