import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollableBanner from '../components/ScrollableBanner';
import bannerImage from '../assets/imgs/banner2.jpg';

export default function AboutUs() {
  return (
    <>
      <Header />

      <ScrollableBanner
        title="About Brand X Coffee"
        subtitle="Passionate about quality brews and community"
        backgroundImage={bannerImage}
      />

      <main
        style={{
          maxWidth: '900px',
          margin: '40px auto',
          padding: '0 20px',
          color: 'var(--text-color, #333)',
          lineHeight: '1.6',
          fontSize: '18px',
          textAlign: 'center',
        }}
      >
        <h2>Welcome to Brand X Coffee</h2>
        <p>
          We are passionate about bringing you the finest coffee blends sourced
          from around the world. Our mission is to provide a cozy and welcoming
          place where coffee lovers can enjoy great brews and delicious snacks.
        </p>
        <p>
          Founded in 2010, Brand X Coffee has grown into a community favorite,
          focusing on quality, sustainability, and excellent customer service.
          We believe that every cup of coffee should tell a story.
        </p>
        <p>
          Come visit us and experience the perfect coffee moment!
        </p>
      </main>

      <Footer />
    </>
  );
}
