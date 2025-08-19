import React from "react";
import img11 from "../assets/products/11.jpg";
import img10 from "../assets/products/10.jpg";
import img12 from "../assets/products/12.jpg";
import img5 from "../assets/products/5.jpg";
import ProductCard from "./reusable components/ProductCard";

const BEST_SELLERS = [
  { image: img11, title: "Matcha Latte", price: 150, rating: 5 },
  { image: img10, title: "Milk-Based Coffee", price: 130, rating: 4 },
  { image: img12, title: "Hotdog and Egg Rice Meal", price: 180, rating: 5 },
  { image: img5, title: "Iced Coffee", price: 120, rating: 4 },
];

export default function FeaturedSection() {
  return (
    <section
      id="featured"
      className="py-5"
      style={{
        backgroundColor: "#f8f4f0", // light cream background
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/coffee-stains.png')",
      }}
    >
      {/* Section Header */}
      <div className="container text-center mb-5">
        <h2
          className="fw-bold text-uppercase display-6"
          style={{
            color: "#4b3832", // deep coffee brown
            fontFamily: "'Merriweather', serif",
          }}
        >
          ☕ Best Sellers
        </h2>
        <div
          className="mx-auto my-3"
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#6f4e37", // coffee accent
            borderRadius: "2px",
          }}
        />
        <p
          className="fs-5 mb-0"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            color: "#7b6d62",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          Enjoy our most popular coffee drinks and signature rice meals —
          crafted to perfection for every taste.
        </p>
      </div>

      {/* Product Grid */}
      <div className="container">
        <div className="row g-4 justify-content-center">
          {BEST_SELLERS.map((product, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              key={index}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
