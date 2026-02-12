// src/utils/products.js
import { apiFetch } from "./api";

// ======== GET ALL PRODUCTS ========
export const getProducts = async () => {
  try {
    const products = await apiFetch("/products");
    return products || [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
};

// ======== CREATE PRODUCT ========
export const createProduct = async (product) => {
  try {
    return await apiFetch("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  } catch (err) {
    console.error("Failed to create product:", err);
    throw err;
  }
};

// ======== UPDATE PRODUCT ========
export const updateProduct = async (id, product) => {
  try {
    return await apiFetch(`/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  } catch (err) {
    console.error(`Failed to update product ${id}:`, err);
    throw err;
  }
};

// ======== DELETE PRODUCT ========
export const deleteProduct = async (id) => {
  try {
    return await apiFetch(`/products/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(`Failed to delete product ${id}:`, err);
    throw err;
  }
};
