import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/index.css";
import './styles/App.css';  
import './styles/Banner.css';  
import "./styles/Header.css";
import "./styles/Footer.css"; // new stylesheet
import "./styles/Home.css";
import "./styles/HomeSection.css";
import './styles/MenuItem.css';
import './styles/Menu.css';



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
