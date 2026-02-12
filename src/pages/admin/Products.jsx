import React, { useState, useEffect } from "react";
import { getProducts, createProduct, deleteProduct } from "../../utils/products";

// Sample images
import img10 from "../../assets/products/iced-coffee/caramelmac.jpg";
import img11 from "../../assets/products/iced-coffee/salted-caramel.jpg";
import img12 from "../../assets/products/iced-coffee/americano.jpg";
import img4 from "../../assets/products/4.jpg";
import img5 from "../../assets/products/5.jpg";
import img6 from "../../assets/products/6.jpg";

const imageOptions = { img10, img11, img12, img4, img5, img6 };

export default function Products() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    category: "ICED COFFEE",
    price_12oz: "",
    price_16oz: "",
    price_single: "",
    image_url: img10,
  });

  // Fetch products from backend
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Enter a product name");

    try {
      const newItem = {
        ...form,
        price_12oz: form.price_12oz ? Number(form.price_12oz) : undefined,
        price_16oz: form.price_16oz ? Number(form.price_16oz) : undefined,
        price_single: form.price_single ? Number(form.price_single) : undefined,
      };

      await createProduct(newItem);
      fetchMenu(); // refresh list

      setForm({
        name: "",
        category: "ICED COFFEE",
        price_12oz: "",
        price_16oz: "",
        price_single: "",
        image_url: img10,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

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
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Add New Menu Item</h5>
          <form onSubmit={handleAdd} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
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
              <label className="form-label">Image</label>
              <select
                name="image_url"
                className="form-select"
                value={Object.keys(imageOptions).find(
                  (k) => imageOptions[k] === form.image_url
                )}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image_url: imageOptions[e.target.value] }))
                }
              >
                {Object.keys(imageOptions).map((key) => (
                  <option key={key} value={key}>
                    {key.replace("img", "")}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 12oz</label>
              <input
                type="number"
                name="price_12oz"
                className="form-control"
                value={form.price_12oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 16oz</label>
              <input
                type="number"
                name="price_16oz"
                className="form-control"
                value={form.price_16oz}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Single Price</label>
              <input
                type="number"
                name="price_single"
                className="form-control"
                value={form.price_single}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <button className="btn btn-warning">Add to Menu</button>
            </div>
          </form>
        </div>
      </div>

      {/* Menu List */}
      <div className="row g-3">
        {menu.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100">
              <img
                src={item.image_url}
                className="card-img-top"
                alt={item.name}
                style={{ height: 180, objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>{item.category}</strong>
                  <br />
                  {item.price_single && <>₱{item.price_single}<br /></>}
                  {item.price_12oz && <>12oz: ₱{item.price_12oz} / 16oz: ₱{item.price_16oz}</>}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
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
