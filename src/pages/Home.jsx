import React from "react";
import HomeSection from "../components/HomeSection";
import FeaturedSection from "../components/FeaturedSection";
import BannerSection from "../components/reusable components/BannerSection";
import Menu from "../components/Menu";   // <-- import Menu
import StoreLocation from "../components/StoreLocation";
import ScrollableBanner from "../components/reusable components/ScrollableBanner";
import bannerImage from '../assets/imgs/banner2.jpg';

export default function Home() {
  return (
    <>
      <main style={{ paddingTop: "65px" }}>
        <HomeSection />
        <FeaturedSection />
        <ScrollableBanner
        title="About Brand X Coffee"
        subtitle="Passionate about quality brews and community"
        backgroundImage={bannerImage}
        />
        <Menu />                
        <BannerSection
            title="Welcome to Brand X Coffee"
            subtitle="Enjoy the best brews and snacks"
            buttonLabel="Shop Now"
            onButtonClick={() => alert('Button clicked!')}
            backgroundImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1350&q=80"
        />
        <StoreLocation/>
      </main>
    </>
  );
}
