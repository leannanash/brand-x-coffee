// src/utils/checkoutOrder.js
import { apiFetch } from "./api";

export async function checkoutOrder({ customerName, items }) {
  return apiFetch("/checkout", {
    method: "POST",
    body: JSON.stringify({
      customerName,
      items: items.map((item) => ({
        id: item.id,
        title: item.name,
        size: item.size,
        price: item.price,
        qty: item.qty,
      })),
    }),
  });
}