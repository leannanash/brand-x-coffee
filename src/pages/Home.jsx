import React from "react";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HomeSection";
import FeaturedSection from "../components/FeaturedSection";
import BannerSection from "../components/BannerSection";
import Menu from "../components/Menu";   // <-- import Menu
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <HomeSection />
        <FeaturedSection />
        <Menu />                
        <BannerSection
            title="Welcome to Brand X Coffee"
            subtitle="Enjoy the best brews and snacks"
            buttonLabel="Shop Now"
            onButtonClick={() => alert('Button clicked!')}
            backgroundImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1350&q=80"
        />
      </main>
      <Footer />
    </>
  );
}
