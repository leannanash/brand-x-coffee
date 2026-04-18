import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";

// styles
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
import "./styles/AboutUs.css";
import "./styles/Modal.css";
import "./styles/Profile.css";
import "./styles/App.css";

// ✅ ENV
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);