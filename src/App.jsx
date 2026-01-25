import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./MainLayout";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";



export default function App() {
  return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
  );
}
