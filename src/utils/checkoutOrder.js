import { apiFetch } from "./api";

export async function checkoutOrder({ customer_name, phone, email, address, items }) {
  if (!items || !items.length) {
    throw new Error("No items in the order");
  }

  // Validate items
  items.forEach((item, index) => {
    const productId = item.product_id || item.id;

    if (!productId) {
      throw new Error(`Item at index ${index} is missing product_id`);
    }

    if (!item.size) {
      throw new Error(`Item at index ${index} is missing size`);
    }

    if (!item.qty || Number(item.qty) <= 0) {
      throw new Error(`Item at index ${index} has invalid quantity`);
    }
  });

  const payloadItems = items.map((item) => ({
    product_id: item.product_id || item.id,
    size: item.size,
    qty: Number(item.qty),
  }));

  return apiFetch("/checkout", {
    method: "POST",
    body: JSON.stringify({
      customer_name: customer_name || "Guest",
      phone: phone || null,
      email: email || null,
      address: address || null,
      items: payloadItems,
    }),
  });
}