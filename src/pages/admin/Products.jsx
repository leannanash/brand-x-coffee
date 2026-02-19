// src/pages/admin/Products.jsx
import React, { useState, useEffect } from "react";
import { getProducts, createProduct, deleteProduct } from "../../utils/products";
import { uploadImage } from "../../utils/upload";

export default function Products() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "ICED COFFEE",
    price12oz: "",
    price16oz: "",
    pricesingle: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  // Fetch products
  const fetchMenu = async () => {
    try {
      const data = await getProducts();
      setMenu(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add product
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Enter a product title");
    if (!form.image_url) return alert("Upload an image");

    try {
      const newItem = {
        title: form.title,
        description: form.description,
        category: form.category,
        price12oz: form.price12oz ? Number(form.price12oz) : null,
        price16oz: form.price16oz ? Number(form.price16oz) : null,
        pricesingle: form.pricesingle ? Number(form.pricesingle) : null,
        image_url: form.image_url,
      };

      await createProduct(newItem);
      fetchMenu(); // refresh list

      // Reset form
      setForm({
        title: "",
        description: "",
        category: "ICED COFFEE",
        price12oz: "",
        price16oz: "",
        pricesingle: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteProduct(id);
      setMenu((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <div className="text-center py-5">Loading products...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Menu Manager</h2>

      {/* Add Product Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Add New Menu Item</h5>
          <form onSubmit={handleAdd} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
              >
                <option>ICED COFFEE</option>
                <option>NON-COFFEE (ICED)</option>
                <option>HOT COFFEE</option>
                <option>RICE MEALS</option>
                <option>BURGERS</option>
                <option>DESSERTS</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const url = await uploadImage(file);
                    setForm((prev) => ({ ...prev, image_url: url }));
                  } catch (err) {
                    console.error(err);
                    alert("Failed to upload image");
                  } finally {
                    setUploading(false);
                  }
                }}
              />
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="mt-2 rounded"
                  style={{ height: 100, objectFit: "cover" }}
                />
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 12oz</label>
              <input
                type="number"
                name="price12oz"
                className="form-control"
                value={form.price12oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 16oz</label>
              <input
                type="number"
                name="price16oz"
                className="form-control"
                value={form.price16oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Single Price</label>
              <input
                type="number"
                name="pricesingle"
                className="form-control"
                value={form.pricesingle}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button
                className="btn btn-warning"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Add to Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Menu List */}
      <div className="row g-3">
        {menu.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              {item.image_url && (
                <img
                  src={item.image_url}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: 180, objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                {item.description && <p className="card-text">{item.description}</p>}
                <p className="card-text">
                  <strong>{item.category}</strong>
                  <br />
                  {item.pricesingle && <>₱{item.pricesingle}<br /></>}
                  {item.price12oz && <>12oz: ₱{item.price12oz} / 16oz: ₱{item.price16oz}</>}
                </p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
