// src/pages/admin/Products.jsx
import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../../utils/products";
import { uploadImage } from "../../utils/upload";

export default function Products() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "ICED COFFEE",
    price12oz: "",
    price16oz: "",
    pricesingle: "",
    image_url: "",
    is_available: true,
  });

  const [editingId, setEditingId] = useState(null);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) return alert("Enter product title");
    if (!form.image_url) return alert("Upload an image");

    try {
      const payload = {
        ...form,
        price12oz: form.price12oz ? Number(form.price12oz) : null,
        price16oz: form.price16oz ? Number(form.price16oz) : null,
        pricesingle: form.pricesingle ? Number(form.pricesingle) : null
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      fetchMenu();

      setForm({
        title: "",
        description: "",
        category: "ICED COFFEE",
        price12oz: "",
        price16oz: "",
        pricesingle: "",
        image_url: "",
        is_available: true
      });

      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "ICED COFFEE",
      price12oz: item.price12oz || "",
      price16oz: item.price16oz || "",
      pricesingle: item.pricesingle || "",
      image_url: item.image_url || "",
      is_available: item.is_available ?? true
    });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteProduct(id);
      setMenu((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Filter products
  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Menu Manager</h2>

      {/* SEARCH + FILTER */}
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option>ICED COFFEE</option>
          <option>HOT COFFEE</option>
          <option>NON-COFFEE (ICED)</option>
          <option>RICE MEALS</option>
          <option>BURGERS</option>
          <option>DESSERTS</option>
        </select>
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3">
            {editingId ? "Edit Product" : "Add Product"}
          </h5>

          <form onSubmit={handleSubmit} className="row g-3">

            <div className="col-md-4">
              <input
                className="form-control"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <select
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
              >
                <option>ICED COFFEE</option>
                <option>HOT COFFEE</option>
                <option>NON-COFFEE (ICED)</option>
                <option>RICE MEALS</option>
                <option>BURGERS</option>
                <option>DESSERTS</option>
              </select>
            </div>

            {/* IMAGE */}
            <div className="col-md-4">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setUploading(true);

                  try {
                    const url = await uploadImage(file);
                    setForm((prev) => ({ ...prev, image_url: url }));
                  } catch {
                    alert("Upload failed");
                  }

                  setUploading(false);
                }}
              />

              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="preview"
                  className="mt-2 rounded"
                  style={{ height: 90 }}
                />
              )}
            </div>

            {/* PRICES */}
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                name="price12oz"
                placeholder="12oz price"
                value={form.price12oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                name="price16oz"
                placeholder="16oz price"
                value={form.price16oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                name="pricesingle"
                placeholder="Single price"
                value={form.pricesingle}
                onChange={handleChange}
              />
            </div>

            {/* AVAILABILITY */}
            <div className="col-md-4">
              <label className="form-check">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                />
                <span className="ms-2">Available</span>
              </label>
            </div>

            <div className="col-12">
              <button className="btn btn-warning" disabled={uploading}>
                {uploading ? "Uploading..." : editingId ? "Update Product" : "Add Product"}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="row g-3">
        {filteredMenu.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100 shadow-sm">

              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: 180, objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5>{item.title}</h5>

                <p className="text-muted">{item.category}</p>

                <p>
                  {item.pricesingle && <>₱{item.pricesingle}<br /></>}
                  {item.price12oz && <>12oz ₱{item.price12oz}</>}
                  {item.price16oz && <> / 16oz ₱{item.price16oz}</>}
                </p>

                {!item.is_available && (
                  <span className="badge bg-danger">Out of Stock</span>
                )}

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}