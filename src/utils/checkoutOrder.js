// src/utils/checkoutOrder.js
import { apiFetch } from "./api";

// Checkout order
export async function checkoutOrder({ items }) {
  return apiFetch("/checkout", {
    method: "POST",
    body: JSON.stringify({
      items: items.map(item => ({
        id: item.id,
        title: item.name,
        size: item.size,
        price: item.price,
        qty: item.qty,
      })),
    }),
  });
}