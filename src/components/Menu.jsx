import React from "react";
import MenuItem from "./MenuItem";

import img4 from "../assets/products/4.jpg";
import img5 from "../assets/products/5.jpg";
import img6 from "../assets/products/6.jpg";
import img7 from "../assets/products/7.jpg";
import img8 from "../assets/products/8.jpg";
import img9 from "../assets/products/9.jpg";

const menuData = {
  coffeeDrinks: [
    {
      image: img4,
      title: "Matcha Latte",
      price: 150,
      rating: 5,
    },
    {
      image: img5,
      title: "Milk-Based Coffee",
      price: 130,
      rating: 4,
    },
    {
      image: img6,
      title: "Iced Coffee",
      price: 120,
      rating: 4,
    },
  ],
  riceMeals: [
    {
      image: img7,
      title: "Hotdog and Egg Rice Meal",
      price: 180,
      rating: 5,
    },
    {
      image: img8,
      title: "Chicken Adobo Rice Meal",
      price: 200,
      rating: 5,
    },
  ],
  desserts: [
    {
      image: img9,
      title: "Classic Cheesecake",
      price: 90,
      rating: 4,
    },
  ],
};

export default function Menu() {
  return (
    <section id="menu" className="my-5 pb-5">
      <div className="container text-center mt-5 py-5">
        <h3>Our Menu</h3>
        <hr className="mx-auto" />
        <p>Explore our coffee drinks and tasty meals</p>
      </div>

      {/* Coffee Drinks */}
      <div className="container">
        <h4 className="mb-4">Coffee Drinks</h4>
        <div className="row">
          {menuData.coffeeDrinks.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      {/* Rice Meals */}
      <div className="container mt-5">
        <h4 className="mb-4">Rice Meals</h4>
        <div className="row">
          {menuData.riceMeals.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      {/* Desserts */}
      <div className="container mt-5">
        <h4 className="mb-4">Desserts</h4>
        <div className="row">
          {menuData.desserts.map((item, idx) => (
            <MenuItem
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
