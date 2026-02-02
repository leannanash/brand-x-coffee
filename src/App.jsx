import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./auth/Login";

export default function App() {
  return (
    <Routes>
      {/* Standalone Login page (no header) */}
      <Route path="/login" element={<Login />} />

      {/* All other pages with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
