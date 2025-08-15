import React from "react"; 
import MenuItem from "./MenuItem";

import img4 from "../assets/products/4.jpg"; // Reuse for iced coffee
import img5 from "../assets/products/5.jpg"; // Reuse for non-coffee iced
import img6 from "../assets/products/6.jpg"; // Reuse for hot coffee
import img7 from "../assets/products/7.jpg"; // Reuse for rice meals
import img8 from "../assets/products/8.jpg"; // Reuse for burgers
import img9 from "../assets/products/9.jpg"; // Reuse for desserts

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
    {
      image: img6,
      title: "Specialty Coffee / Pour Over",
      priceRange: [150, 280],
      note: "Depends on the available beans",
    },
  ],
  riceMeals: [
    { image: img7, title: "Baczeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Tapzeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Siomaizeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
    { image: img7, title: "Hotzeelog", price: 95, note: "Silog meals with homemade cheese sauce" },
  ],
  burgers: [
    {
      image: img8,
      title: "Xtazee (Caramelized onions, cheese and hms)",
      priceSingle: 130,
      priceDouble: 160,
      description: "100% pure beef",
    },
    {
      image: img8,
      title: "Clazeek (Tomato, lettuce, cheese and hms)",
      priceSingle: 130,
      priceDouble: 160,
      description: "100% pure beef",
    },
    {
      image: img8,
      title: "BaconXburger (Clazeek with bacooooon!!!)",
      priceSingle: 130,
      priceDouble: 160,
      description: "100% pure beef",
    },
  ],
  desserts: [
    { image: img9, title: "Classic Cheesecake", price: 90, rating: 4 },
  ],
};

// Helper to split featured and others with configurable count
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
  const { featured: featuredDesserts, others: otherDesserts } = splitFeatured(menuData.desserts, 3); // keep 3 for desserts (or adjust)

  return (
    <section id="menu" className="my-5 pb-5">
      <div className="container text-center mt-5 py-5">
        <h3>BRANDXCOFFEE MENU</h3>
        <hr className="mx-auto" />
        <p>Open Hours: 1pm - 9pm | Contact: 09393039528</p>
      </div>

      {/* ICED COFFEE */}
      <div className="container">
        <h4 className="mb-4">ICED COFFEE</h4>
        <div className="row">
          {featuredIcedCoffee.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={`${item.price12oz} / ${item.price16oz}`}
            />
          ))}
        </div>
        {otherIcedCoffee.length > 0 && (
          <div className="mt-3">
            <h5>Other Iced Coffee</h5>
            <ul className="list-unstyled">
              {otherIcedCoffee.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> — {item.price12oz} / {item.price16oz} PHP
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* NON-COFFEE (ICED) */}
      <div className="container mt-5">
        <h4 className="mb-4">NON-COFFEE (ICED)</h4>
        <div className="row">
          {featuredNonCoffee.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={`${item.price12oz} / ${item.price16oz}`}
            />
          ))}
        </div>
        {otherNonCoffee.length > 0 && (
          <div className="mt-3">
            <h5>Other Non-Coffee (Iced)</h5>
            <ul className="list-unstyled">
              {otherNonCoffee.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> — {item.price12oz} / {item.price16oz} PHP
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* HOT COFFEE */}
      <div className="container mt-5">
        <h4 className="mb-4">HOT COFFEE</h4>
        <div className="row">
          {featuredHotCoffee.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={
                item.price
                  ? item.price
                  : item.priceRange
                  ? `${item.priceRange[0]} - ${item.priceRange[1]}`
                  : ""
              }
              rating={item.rating}
              note={item.note}
            />
          ))}
        </div>
        {otherHotCoffee.length > 0 && (
          <div className="mt-3">
            <h5>Other Hot Coffee</h5>
            <ul className="list-unstyled">
              {otherHotCoffee.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> —{" "}
                  {item.price
                    ? item.price
                    : item.priceRange
                    ? `${item.priceRange[0]} - ${item.priceRange[1]}`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RICE MEALS */}
      <div className="container mt-5">
        <h4 className="mb-4">RICE MEAL</h4>
        <div className="row">
          {featuredRiceMeals.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              note={item.note}
            />
          ))}
        </div>
        {otherRiceMeals.length > 0 && (
          <div className="mt-3">
            <h5>Other Rice Meals</h5>
            <ul className="list-unstyled">
              {otherRiceMeals.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> — {item.price} PHP{" "}
                  {item.note && <em>({item.note})</em>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* BURGERS */}
      <div className="container mt-5">
        <h4 className="mb-4">BURGERS (Single / Double Patty, 100% pure beef)</h4>
        <div className="row">
          {featuredBurgers.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={`${item.priceSingle} / ${item.priceDouble}`}
              note={item.description}
            />
          ))}
        </div>
        {otherBurgers.length > 0 && (
          <div className="mt-3">
            <h5>Other Burgers</h5>
            <ul className="list-unstyled">
              {otherBurgers.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> — {item.priceSingle} / {item.priceDouble} PHP{" "}
                  {item.description && <em>({item.description})</em>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* DESSERTS */}
      <div className="container mt-5">
        <h4 className="mb-4">DESSERTS</h4>
        <div className="row">
          {featuredDesserts.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
        {otherDesserts.length > 0 && (
          <div className="mt-3">
            <h5>Other Desserts</h5>
            <ul className="list-unstyled">
              {otherDesserts.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{item.title}</strong> — {item.price} PHP
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
