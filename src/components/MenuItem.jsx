import React from "react";

export default function MenuItem({ image, title, price, priceSingle, priceDouble, rating, note }) {
  const displayPrice = price || (priceSingle ? `${priceSingle} / ${priceDouble}` : price);

  return (
    <div className="menu-card card text-center shadow-sm h-100">
      <div className="card-img-wrapper position-relative">
        <img
          src={image}
          alt={title}
          className="card-img-top img-fluid"
          style={{ objectFit: "cover", height: "200px", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
        />
        {rating && (
          <div className="star-rating position-absolute top-0 end-0 m-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star${i < rating ? "" : "-half-alt"}`}
                style={{ color: i < rating ? "#ffc107" : "#e4e5e9", fontSize: "0.85rem" }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        {note && <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>{note}</p>}
        {displayPrice && <h6 className="card-subtitle mb-3">₱{displayPrice}</h6>}
        <button className="btn btn-outline-warning mt-auto">Buy Now</button>
      </div>
    </div>
  );
}
