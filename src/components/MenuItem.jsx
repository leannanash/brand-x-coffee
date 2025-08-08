import React from "react";

export default function MenuItem({ image, title, price, rating }) {
  return (
    <div className="product text-center col-lg-3 col-md-4 col-sm-12 mb-4">
      <img className="img-fluid mb-3" src={image} alt={title} />
      <div className="star mb-2">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas fa-star${i < rating ? "" : "-half-alt"}`}
            style={{ color: i < rating ? "#ffc107" : "#e4e5e9" }}
          />
        ))}
      </div>
      <h5 className="p-name">{title}</h5>
      <h4 className="p-price">P{price}</h4>
      <button className="buy-btn btn btn-outline-primary">Buy Now</button>
    </div>
  );
}
