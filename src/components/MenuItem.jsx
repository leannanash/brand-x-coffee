import React from "react";
import "../styles/menuitem.css"; // ensure this exists

export default function MenuItem({
  name,
  image_url,
  note,
  rating,
  onOpenModal,
  price_12oz,
  price_16oz,
  price_single,
  featured,
}) {
  // Determine price display
  const displayPrice = price_single
    ? `₱${price_single}`
    : price_12oz
    ? `12oz: ₱${price_12oz} / 16oz: ₱${price_16oz}`
    : "";

  return (
    <div
      className={`menu-card card text-center shadow-sm h-100 ${
        featured ? "featured-item" : ""
      }`}
    >
      <div className="card-img-wrapper position-relative">
        <img src={image_url} alt={name} className="card-img-top img-fluid" />
        
        {featured && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
            FEATURED
          </span>
        )}

        {rating && (
          <div className="star-rating position-absolute top-0 end-0 m-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className="fas fa-star"
                style={{
                  color: i < rating ? "#ffc107" : "#e4e5e9",
                  fontSize: "0.85rem",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        {note && <p className="text-muted mb-2">{note}</p>}
        {displayPrice && <h6 className="card-subtitle mb-3">{displayPrice}</h6>}

        <button className="btn btn-warning mt-auto" onClick={onOpenModal}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}
