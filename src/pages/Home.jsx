import React from "react";
import HomeSection from "../components/HomeSection";
import StoreLocationPreview from "../components/StoreLocationPreview";

export default function Home() {
  return (
    <>
    
      <main className="home">
        <HomeSection />
        <StoreLocationPreview/>
      </main>
    </>
  );
}
