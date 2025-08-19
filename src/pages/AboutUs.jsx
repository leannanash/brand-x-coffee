import React from 'react';
import ScrollableBanner from '../components/reusable components/ScrollableBanner';
import bannerImage from '../assets/imgs/banner2.jpg';

export default function AboutUs() {
  return (
    <>
      <ScrollableBanner
        title="About Brand X Coffee"
        subtitle="Passionate about quality brews and community"
        backgroundImage={bannerImage}
      />

      <main
        style={{
          maxWidth: '900px',
          margin: '60px auto',
          padding: '0 20px',
          color: '#4b3621', // deep coffee brown
          lineHeight: '1.8',
          fontSize: '18px',
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            color: '#b5895a', // latte highlight
          }}
        >
          Welcome to Brand X Coffee
        </h2>

        <p
          style={{
            backgroundColor: '#fdf6ec',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          We are passionate about bringing you the finest coffee blends sourced
          from around the world. Our mission is to provide a cozy and welcoming
          place where coffee lovers can enjoy great brews and delicious snacks.
        </p>

        <p
          style={{
            backgroundColor: '#fdf6ec',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          Founded in 2010, Brand X Coffee has grown into a community favorite,
          focusing on quality, sustainability, and excellent customer service.
          We believe that every cup of coffee should tell a story.
        </p>

        <p
          style={{
            backgroundColor: '#fdf6ec',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          Come visit us and experience the perfect coffee moment!
        </p>
      </main>
    </>
  );
}
