import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./MainLayout";



export default function App() {
  return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MainLayout>
  );
}
