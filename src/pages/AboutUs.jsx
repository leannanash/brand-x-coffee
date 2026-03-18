import React from 'react';
import ScrollableBanner from "../components/reusable/ScrollableBanner";
import bannerImage from '../assets/imgs/banner2.jpg';

export default function AboutUs() {
  return (
    <section className="about-page">

      {/* FULL WIDTH BANNER */}
      <div className="container-fluid p-0">
        <ScrollableBanner
          title="About Brand X Coffee"
          subtitle="Passionate about quality brews and community"
          backgroundImage={bannerImage}
        />
      </div>

      {/* CONTENT */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">

            <h2
              style={{
                fontSize: '2.5rem',
                marginBottom: '30px',
                color: '#b5895a',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Welcome to Brand X Coffee
            </h2>

            <div className="mb-4 p-4 rounded shadow-sm" style={{ backgroundColor: '#fdf6ec' }}>
              <p style={{ margin: 0, lineHeight: '1.8', fontSize: '18px', color: '#4b3621' }}>
                We are passionate about bringing you the finest coffee blends sourced
                from around the world. Our mission is to provide a cozy and welcoming
                place where coffee lovers can enjoy great brews and delicious snacks.
              </p>
            </div>

            <div className="mb-4 p-4 rounded shadow-sm" style={{ backgroundColor: '#fdf6ec' }}>
              <p style={{ margin: 0, lineHeight: '1.8', fontSize: '18px', color: '#4b3621' }}>
                Founded in 2010, Brand X Coffee has grown into a community favorite,
                focusing on quality, sustainability, and excellent customer service.
                We believe that every cup of coffee should tell a story.
              </p>
            </div>

            <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#fdf6ec' }}>
              <p style={{ margin: 0, lineHeight: '1.8', fontSize: '18px', color: '#4b3621' }}>
                Come visit us and experience the perfect coffee moment!
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}