import React, { useState, useEffect } from "react";

// Sample images
import img10 from "../../assets/products/iced-coffee/caramelmac.jpg";
import img11 from "../../assets/products/iced-coffee/salted-caramel.jpg";
import img12 from "../../assets/products/iced-coffee/americano.jpg";
import img4 from "../../assets/products/4.jpg";
import img5 from "../../assets/products/5.jpg";
import img6 from "../../assets/products/6.jpg";

const initialMenu = [
  { id: 1, category: "ICED COFFEE", title: "Salted Caramel", image: img11, price12oz: 80, price16oz: 105 },
  { id: 2, category: "ICED COFFEE", title: "Macchiato", image: img10, price12oz: 80, price16oz: 105 },
  { id: 3, category: "ICED COFFEE", title: "Americano", image: img12, price12oz: 80, price16oz: 105 },
  { id: 4, category: "NON-COFFEE (ICED)", title: "Matcha", image: img5, price12oz: 80, price16oz: 105 },
  { id: 5, category: "HOT COFFEE", title: "Latte", image: img6, priceSingle: 90 },
  { id: 6, category: "RICE MEALS", title: "Baczeelog", image: img4, priceSingle: 95 },
];

export default function Products() {
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("menuData");
    return saved ? JSON.parse(saved) : initialMenu;
  });

  const [form, setForm] = useState({
    title: "",
    category: "ICED COFFEE",
    price12oz: "",
    price16oz: "",
    priceSingle: "",
    image: img10, // default
  });

  useEffect(() => {
    localStorage.setItem("menuData", JSON.stringify(menu));
  }, [menu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title) return alert("Enter a product name");

    const newItem = {
      id: Date.now(),
      title: form.title,
      category: form.category,
      image: form.image,
      price12oz: form.price12oz ? Number(form.price12oz) : undefined,
      price16oz: form.price16oz ? Number(form.price16oz) : undefined,
      priceSingle: form.priceSingle ? Number(form.priceSingle) : undefined,
    };

    setMenu(prev => [...prev, newItem]);

    setForm({
      title: "",
      category: "ICED COFFEE",
      price12oz: "",
      price16oz: "",
      priceSingle: "",
      image: img10,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;
    setMenu(prev => prev.filter(item => item.id !== id));
  };

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
              <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select name="category" className="form-select" value={form.category} onChange={handleChange}>
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
                name="image"
                className="form-select"
                value={form.image}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    image:
                      e.target.value === "img10" ? img10 :
                      e.target.value === "img11" ? img11 :
                      e.target.value === "img12" ? img12 :
                      e.target.value === "img4" ? img4 :
                      e.target.value === "img5" ? img5 : img6
                  }))
                }
              >
                <option value="img10">Caramel Macchiato</option>
                <option value="img11">Salted Caramel</option>
                <option value="img12">Americano</option>
                <option value="img4">Meal Image</option>
                <option value="img5">Matcha</option>
                <option value="img6">Latte</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 12oz</label>
              <input type="number" name="price12oz" className="form-control" value={form.price12oz} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Price 16oz</label>
              <input type="number" name="price16oz" className="form-control" value={form.price16oz} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Single Price</label>
              <input type="number" name="priceSingle" className="form-control" value={form.priceSingle} onChange={handleChange} />
            </div>

            <div className="col-12">
              <button className="btn btn-warning">Add to Menu</button>
            </div>
          </form>
        </div>
      </div>

      {/* Menu List */}
      <div className="row g-3">
        {menu.map(item => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.title} style={{ height: 180, objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  <strong>{item.category}</strong><br />
                  {item.priceSingle && <>₱{item.priceSingle}<br /></>}
                  {item.price12oz && <>12oz: ₱{item.price12oz} / 16oz: ₱{item.price16oz}</>}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
