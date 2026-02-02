import React from "react";
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
    { image: img4, title: "Vanilla", price12oz: 80, price16oz: 105 },
    { image: img12, title: "Americano", price12oz: 80, price16oz: 105 },
  ],
  nonCoffeeIced: [
    { image: img5, title: "Matcha", price12oz: 80, price16oz: 105 },
    { image: img5, title: "Matcha Strawberry", price12oz: 80, price16oz: 105 },
    { image: img5, title: "Ube", price12oz: 80, price16oz: 105 },
  ],
  hotCoffee: [
    { image: img6, title: "Latte", priceSingle: 90 },
    { image: img6, title: "Flat White", priceSingle: 90 },
    { image: img6, title: "Long Black", priceSingle: 90 },
  ],
  riceMeals: [
    { image: img7, title: "Baczeelog", priceSingle: 95, note: "Silog meals" },
    { image: img7, title: "Tapzeelog", priceSingle: 95, note: "Silog meals" },
  ],
  burgers: [
    { image: img8, title: "Xtazee", priceSingle: 130, priceDouble: 160 },
    { image: img8, title: "Clazeek", priceSingle: 130, priceDouble: 160 },
  ],
  desserts: [
    { image: img9, title: "Classic Cheesecake", priceSingle: 90, rating: 4 },
  ],
};

function splitFeatured(items, featuredCount) {
  return {
    featured: items.slice(0, featuredCount),
    others: items.slice(featuredCount),
  };
}

export default function Menu({ activeCategory, onOpenModal }) {
  const renderSection = (title, items) => {
    const { featured, others } = splitFeatured(items, 2);
    return (
      <div className="menu-section my-5">
        <div className="container">
          <h4 className="section-title mb-4">{title}</h4>

          <div className="row g-4">
            {featured.map((item, idx) => (
              <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                <MenuItem
                  {...item}
                  displayPrice={
                    item.priceSingle
                      ? `${item.priceSingle}`
                      : item.price12oz
                      ? `${item.price12oz} / ${item.price16oz}`
                      : ""
                  }
                  note={item.note || item.description}
                  onOpenModal={() => onOpenModal(item)}
                />
              </div>
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-4">
              <h5 className="text-secondary mb-3">Other {title}</h5>
              <div className="row g-3">
                {others.map((item, idx) => (
                  <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                    <MenuItem
                      {...item}
                      displayPrice={
                        item.priceSingle
                          ? `${item.priceSingle}`
                          : item.price12oz
                          ? `${item.price12oz} / ${item.price16oz}`
                          : ""
                      }
                      note={item.note || item.description}
                      onOpenModal={() => onOpenModal(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {(activeCategory === "ALL" || activeCategory === "ICED COFFEE") &&
        renderSection("ICED COFFEE", menuData.icedCoffee)}
      {(activeCategory === "ALL" || activeCategory === "NON-COFFEE (ICED)") &&
        renderSection("NON-COFFEE (ICED)", menuData.nonCoffeeIced)}
      {(activeCategory === "ALL" || activeCategory === "HOT COFFEE") &&
        renderSection("HOT COFFEE", menuData.hotCoffee)}
      {(activeCategory === "ALL" || activeCategory === "RICE MEALS") &&
        renderSection("RICE MEALS", menuData.riceMeals)}
      {(activeCategory === "ALL" || activeCategory === "BURGERS") &&
        renderSection("BURGERS", menuData.burgers)}
      {(activeCategory === "ALL" || activeCategory === "DESSERTS") &&
        renderSection("DESSERTS", menuData.desserts)}
    </>
  );
}
