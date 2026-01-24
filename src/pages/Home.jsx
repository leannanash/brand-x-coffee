import React from "react";
import HomeSection from "../components/HomeSection";
import FeaturedSection from "../components/FeaturedSection";
import BannerSection from "../components/reusable components/BannerSection";
import Menu from "../components/Menu";   // <-- import Menu
import StoreLocation from "../components/StoreLocation";
import ScrollableBanner from "../components/reusable components/ScrollableBanner";
import bannerImage from '../assets/imgs/banner4.jpg';

export default function Home() {
  return (
    <>
    
      <main style={{ paddingTop: "65px" }}>
        <HomeSection />
        <FeaturedSection />
        <BannerSection
            title="Welcome to Brand X Coffee"
            subtitle="Enjoy the best brews and snacks"
            buttonLabel="Shop Now"
            onButtonClick={() => alert('Button clicked!')}
            backgroundImage={bannerImage}></BannerSection>
        <Menu />                
        <StoreLocation/>
      </main>
    </>
  );
}
