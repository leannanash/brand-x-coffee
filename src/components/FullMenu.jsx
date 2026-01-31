import React, { useState } from "react";
import MenuItem from "./reusable/MenuItem";

import img4 from "../assets/products/4.jpg"; 
import img5 from "../assets/products/5.jpg"; 
import img6 from "../assets/products/6.jpg"; 
import img7 from "../assets/products/7.jpg"; 
import img8 from "../assets/products/8.jpg"; 
import img9 from "../assets/products/9.jpg"; 

import img10 from "../assets/products/iced-coffee/caramelmac.jpg";
import img11 from "../assets/products/iced-coffee/salted-caramel.jpg";
import img12 from "../assets/products/iced-coffee/americano.jpg";

const menuData = {
  icedCoffee: [
    { image: img11, title: "Salted Caramel", price12oz: 80, price16oz: 105 },
    { image: img10, title: "Macchiato", price12oz: 80, price16oz: 105 },
    { image: img4, title: "Peppermint", price12oz: 80, price16oz: 105 },
  ],
  hotCoffee: [
    { image: img6, title: "Latte", priceSingle: 90 },
    { image: img6, title: "Flat White", priceSingle: 90 },
  ],
};

function splitFeatured(items, featuredCount) {
  return {
    featured: items.slice(0, featuredCount),
    others: items.slice(featuredCount),
  };
}

export default function Menu({ activeCategory, addToBasket }) {
  const { featured: featuredIcedCoffee, others: otherIcedCoffee } = splitFeatured(menuData.icedCoffee, 3);
  const { featured: featuredHotCoffee, others: otherHotCoffee } = splitFeatured(menuData.hotCoffee, 2);

  // ----- CENTRALIZED MODAL STATE -----
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalSize, setModalSize] = useState("12oz");

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalQty(1);
    setModalSize(item.price16oz ? "12oz" : "single");
    setModalOpen(true);
  };

  const handleAddToBasket = () => {
    if (!selectedItem) return;

    const price =
      modalSize === "12oz" ? selectedItem.price12oz :
      modalSize === "16oz" ? selectedItem.price16oz :
      selectedItem.priceSingle ?? 0;

    addToBasket({
      title: selectedItem.title,
      image: selectedItem.image,
      price,
      size: modalSize,
      qty: modalQty,
    });

    setModalOpen(false);
  };

  const renderMenuSection = (title, featuredItems, otherItems) => (
    <div className="menu-section my-5">
      <div className="container">
        <h4 className="section-title mb-4">{title}</h4>

        <div className="row g-4">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
              <MenuItem
                {...item}
                displayPrice={
                  item.price ??
                  (item.price12oz ? `${item.price12oz} / ${item.price16oz}` : "") ??
                  (item.priceSingle ? `${item.priceSingle}` : "")
                }
                onOpenModal={() => handleOpenModal(item)}
              />
            </div>
          ))}
        </div>

        {otherItems.length > 0 && (
          <div className="mt-4">
            <h5 className="text-secondary mb-3">Other {title}</h5>
            <div className="row g-3">
              {otherItems.map((item, idx) => (
                <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                  <MenuItem
                    {...item}
                    displayPrice={
                      item.price ??
                      (item.price12oz ? `${item.price12oz} / ${item.price16oz}` : "") ??
                      (item.priceSingle ? `${item.priceSingle}` : "")
                    }
                    onOpenModal={() => handleOpenModal(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-5 bg-light">
      {(activeCategory === "ALL" || activeCategory === "ICED COFFEE") &&
        renderMenuSection("ICED COFFEE", featuredIcedCoffee, otherIcedCoffee)}
      {(activeCategory === "ALL" || activeCategory === "HOT COFFEE") &&
        renderMenuSection("HOT COFFEE", featuredHotCoffee, otherHotCoffee)}

      {/* ----- MODAL ----- */}
      {modalOpen && selectedItem && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-dialog bg-white p-4 rounded"
            style={{ minWidth: "300px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>{selectedItem.title}</h5>

            {/* Size */}
            {(selectedItem.price12oz || selectedItem.price16oz) && (
              <div className="mb-2">
                <label>Select Size:</label>
                <select
                  value={modalSize}
                  onChange={(e) => setModalSize(e.target.value)}
                  className="form-select"
                >
                  {selectedItem.price12oz && <option value="12oz">12oz (₱{selectedItem.price12oz})</option>}
                  {selectedItem.price16oz && <option value="16oz">16oz (₱{selectedItem.price16oz})</option>}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-3">
              <label>Quantity:</label>
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setModalQty(q => Math.max(1, q - 1))}>-</button>
                <span>{modalQty}</span>
                <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setModalQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="text-end">
              <button className="btn btn-secondary me-2" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-warning" onClick={handleAddToBasket}>Add to Basket</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
