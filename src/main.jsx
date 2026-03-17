import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";


import "bootstrap/dist/css/bootstrap.min.css"; // library first
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";

// your styles next
import "./styles/index.css";
import "./styles/Header.css";
import "./styles/Footer.css"; 
import "./styles/Home.css";
import "./styles/HomeSection.css";
import "./styles/MenuItem.css";
import "./styles/StoreLocation.css";
import "./styles/BasketSidebar.css";
import "./styles/Login.css";
import "./styles/AuthLayout.css";
import "./styles/AdminLayout.css"; 
import "./styles/Dashboard.css"; 
import "./styles/Shop.css"; 
import "./styles/AddToBasketModal.css";
import "./styles/CheckOutModal.css";
import "./styles/ReceiptModal.css";
import "./styles/Profile.css"; // last so it can override
import "./styles/App.css";      // general app overrides




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
