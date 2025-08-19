// src/components/BrandXcoffeeMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Custom Coffee Icon
const coffeeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -32],
});

const brandXcoords = [14.0711191, 121.3312571];

export default function StoreLocation() {
  return (
    <div className="coffee-map-wrapper">
      <h2 className="coffee-map-title">☕ Find Us at BrandXcoffee</h2>
      <p className="coffee-map-subtitle">San Pablo City, Laguna</p>
      <p className="coffee-map-hours">🕒 Open daily: 1 PM – 9 PM</p>

      <MapContainer center={brandXcoords} zoom={17} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={brandXcoords} icon={coffeeIcon}>
          <Popup>
            <div className="popup-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                alt="coffee icon"
                className="popup-icon"
              />
              <h4>BrandXcoffee</h4>
              <p>San Pablo City, Laguna</p>
              <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "#7b5e57" }}>
                🕒 Open 1 PM – 9 PM
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
