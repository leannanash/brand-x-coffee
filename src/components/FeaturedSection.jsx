import React from "react";

import img11 from "../assets/products/11.jpg";
import img10 from "../assets/products/10.jpg";
import img12 from "../assets/products/12.jpg";
import img5 from "../assets/products/5.jpg";

import ProductCard from "./ProductCard";

const bestSellers = [
  { image: img11, title: "Matcha Latte", price: 150, rating: 5 },
  { image: img10, title: "Milk-Based Coffee", price: 130, rating: 4 },
  { image: img12, title: "Hotdog and Egg Rice Meal", price: 180, rating: 5 },
  { image: img5, title: "Iced Coffee", price: 120, rating: 4 },
];

export default function FeaturedSection() {
  return (
    <section id="featured" className="my-5 pb-5">
      <div className="container text-center mt-5 py-5">
        <h3>Best Sellers</h3>
        <hr className="mx-auto" />
        <p>Our top coffee drinks and tasty rice meals</p>
      </div>
      <div className="row mx-auto container-fluid">
        {bestSellers.map((prod, idx) => (
          <ProductCard
            key={idx}
            image={prod.image}
            title={prod.title}
            price={prod.price}
            rating={prod.rating}
          />
        ))}
      </div>
    </section>
  );
}
