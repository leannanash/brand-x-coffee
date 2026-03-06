const API = "http://localhost:5000/api/orders";

export async function getOrders() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}