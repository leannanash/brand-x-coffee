import React from "react";

export default function ProductCard({ image, title, price, rating = 5 }) {
  return (
    <div
      className="card border-0 shadow-sm h-100 text-center"
      style={{
        transition: "box-shadow 0.3s ease",
        cursor: "pointer",
        borderRadius: "0.75rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      {/* Image */}
      <div
        style={{
          overflow: "hidden",
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
        }}
      >
        <img
          src={image}
          alt={title}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        />
      </div>

      {/* Details */}
      <div className="card-body">
        <div className="mb-2 text-warning" style={{ fontSize: "0.9rem" }}>
          {[...Array(rating)].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
        </div>
        <h6
          className="fw-bold text-dark mb-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={title}
        >
          {title}
        </h6>
        <h5 className="text-primary fw-semibold mb-3">
          ₱{price.toLocaleString()}
        </h5>
        <button
          className="btn btn-primary px-4 py-2 fw-semibold rounded-pill"
          style={{ fontSize: "0.9rem" }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
