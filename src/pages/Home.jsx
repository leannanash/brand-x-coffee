import React from "react";
import HomeSection from "../components/HomeSection";
import MenuPreview from "../components/MenuPreview";
import StoreLocationPreview from "../components/StoreLocationPreview";

export default function Home() {
  return (
    <>
    
      <main className="home">
        <HomeSection />
        <MenuPreview/>                
        <StoreLocationPreview/>
      </main>
    </>
  );
}
