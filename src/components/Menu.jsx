import React from "react";
import MenuItem from "./MenuItem";

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
    { image: img4, title: "White Mocha", price12oz: 80, price16oz: 105 },
    { image: img4, title: "Spanish Latte", price12oz: 80, price16oz: 105 },
  ],
  nonCoffeeIced: [
    { image: img5, title: "Matcha", price12oz: 80, price16oz: 105 },
    { image: img5, title: "Matcha Strawberry", price12oz: 80, price16oz: 105 },
    { image: img5, title: "White Strawberry", price12oz: 80, price16oz: 105 },
    { image: img5, title: "Ube", price12oz: 80, price16oz: 105 },
    { image: img5, title: "Chocolate", price12oz: 80, price16oz: 105 },
  ],
  hotCoffee: [
    { image: img6, title: "Latte", price: 90 },
    { image: img6, title: "Flat White", price: 90 },
    { image: img6, title: "Long Black", price: 90 },
    { image: img6, title: "Specialty Coffee / Pour Over", priceRange: [150, 280], note: "Depends on available beans" },
  ],
  riceMeals: [
    { image: img7, title: "Baczeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Tapzeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Siomaizeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Hotzeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
  ],
  burgers: [
    { image: img8, title: "Xtazee (Caramelized onions, cheese and hms)", priceSingle: 130, priceDouble: 160, description: "100% pure beef" },
    { image: img8, title: "Clazeek (Tomato, lettuce, cheese and hms)", priceSingle: 130, priceDouble: 160, description: "100% pure beef" },
    { image: img8, title: "BaconXburger (Clazeek with bacooooon!!!)", priceSingle: 130, priceDouble: 160, description: "100% pure beef" },
  ],
  desserts: [
    { image: img9, title: "Classic Cheesecake", price: 90, rating: 4 },
  ],
};

// Split featured and others
function splitFeatured(items, featuredCount) {
  const featured = items.slice(0, featuredCount);
  const others = items.slice(featuredCount);
  return { featured, others };
}

export default function Menu() {
  const { featured: featuredIcedCoffee, others: otherIcedCoffee } = splitFeatured(menuData.icedCoffee, 3);
  const { featured: featuredNonCoffee, others: otherNonCoffee } = splitFeatured(menuData.nonCoffeeIced, 2);
  const { featured: featuredHotCoffee, others: otherHotCoffee } = splitFeatured(menuData.hotCoffee, 2);
  const { featured: featuredRiceMeals, others: otherRiceMeals } = splitFeatured(menuData.riceMeals, 2);
  const { featured: featuredBurgers, others: otherBurgers } = splitFeatured(menuData.burgers, 1);
  const { featured: featuredDesserts, others: otherDesserts } = splitFeatured(menuData.desserts, 3);

  const renderMenuSection = (title, featuredItems, otherItems) => (
    <div className="menu-section my-5">
      <div className="container">
        <h4 className="section-title mb-4">{title}</h4>
        <div className="row g-4">
          {featuredItems.map((item, idx) => (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
              <MenuItem
                image={item.image}
                title={item.title}
                price={item.price || (item.price12oz ? `${item.price12oz} / ${item.price16oz}` : "")}
                priceSingle={item.priceSingle}
                priceDouble={item.priceDouble}
                rating={item.rating}
                note={item.note || item.description}
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
                    image={item.image}
                    title={item.title}
                    price={item.price || (item.price12oz ? `${item.price12oz} / ${item.price16oz}` : "")}
                    priceSingle={item.priceSingle}
                    priceDouble={item.priceDouble}
                    rating={item.rating}
                    note={item.note || item.description}
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
      <div className="container text-center mb-5">
        <h2 className="mb-3">BRANDXCOFFEE MENU</h2>
        <hr className="mx-auto mb-2" style={{ width: "80px", borderTop: "3px solid #f5c06f" }} />
        <p className="text-muted">Open Hours: 1pm - 9pm | Contact: 09393039528</p>
      </div>

      {renderMenuSection("ICED COFFEE", featuredIcedCoffee, otherIcedCoffee)}
      {renderMenuSection("NON-COFFEE (ICED)", featuredNonCoffee, otherNonCoffee)}
      {renderMenuSection("HOT COFFEE", featuredHotCoffee, otherHotCoffee)}
      {renderMenuSection("RICE MEALS", featuredRiceMeals, otherRiceMeals)}
      {renderMenuSection("BURGERS", featuredBurgers, otherBurgers)}
      {renderMenuSection("DESSERTS", featuredDesserts, otherDesserts)}
    </section>
  );
}
