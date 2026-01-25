import React from "react";

export default function BannerSection({ title, subtitle, buttonLabel, onButtonClick, backgroundImage }) {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(30,20,10,0.5), rgba(15,10,5,0.5)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: "100px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "700",
    marginBottom: "1rem",
    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
    color: "#f5c06f",
  };

  const subtitleStyle = {
    fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
    fontWeight: "400",
    marginBottom: "2rem",
    textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
    color: "#ffe8c1",
    maxWidth: "700px",
  };

  const buttonStyle = {
    padding: "14px 40px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#b5895a",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    transition: "all 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#8c6239",
    boxShadow: "0 6px 20px rgba(0,0,0,0.55)",
  };

  return (
    <section style={sectionStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={subtitleStyle}>{subtitle}</p>
      {buttonLabel && (
        <button
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
    </section>
  );
}
