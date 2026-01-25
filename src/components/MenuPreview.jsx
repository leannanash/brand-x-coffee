import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "./reusable/MenuItem";

import img4 from "../assets/products/4.jpg";
import img5 from "../assets/products/5.jpg";
import img8 from "../assets/products/8.jpg";
import img9 from "../assets/products/iced-coffee/salted-caramel.jpg";

export default function MenuPreview() {
  const featuredItems = [
    {
      image: img9,
      title: "Salted Caramel Iced Coffee",
      price: "80 / 105",
    },
    {
      image: img4,
      title: "Spanish Latte",
      price: "80 / 105",
    },
    {
      image: img5,
      title: "Matcha Strawberry",
      price: "80 / 105",
    },
    {
      image: img8,
      title: "BaconXburger",
      priceSingle: 130,
      priceDouble: 160,
      note: "100% pure beef",
    },

  ];

  return (
    <section className="menu-preview py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="menu-eyebrow">Popular Picks</span>
          <h2 className="menu-title mt-2">Customer Favorites</h2>
          <p className="menu-subtitle">
            Hand-picked bestsellers you’ll keep coming back for
          </p>
        </div>

        {/* Items */}
        <div className="row g-4 justify-content-center">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
              <div className="menu-card">
                <MenuItem
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  priceSingle={item.priceSingle}
                  priceDouble={item.priceDouble}
                  rating={item.rating}
                  note={item.note}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <Link to="/menu" className="btn btn-outline-dark btn-lg px-5">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
