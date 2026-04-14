import React from 'react';
import ScrollableBanner from "../components/reusable/ScrollableBanner";
import bannerImage from '../assets/imgs/banner2.jpg';
import { useNavigate } from "react-router-dom";


export default function AboutUs() {

  const navigate = useNavigate();
  const coffeeImage = "https://res.cloudinary.com/dro6vrldb/image/upload/v1773746685/25_e33x8y.jpg";
  const carouselImage1 = "https://res.cloudinary.com/dro6vrldb/image/upload/v1776173080/32_hr73of.jpg";
  const carouselImage2 = "https://res.cloudinary.com/dro6vrldb/image/upload/v1776172874/111_hqwc5z.jpg";
  const carouselImage3 = "https://res.cloudinary.com/dro6vrldb/image/upload/v1776172874/1_crrxxr.jpg";

  return (
    <section className="about-page">

      {/* Banner */}
      <div className="container-fluid p-0">
        <ScrollableBanner
          title="About Brand X Coffee"
          subtitle="Crafting moments, one cup at a time"
          backgroundImage={bannerImage}
        />
      </div>

      <div className="container py-5">

        {/* INTRO */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="about-heading">Welcome to Brand X Coffee</h2>

            <p className="about-lead">
              We believe coffee is more than a drink — it's an experience.
              From carefully sourced beans to expertly crafted brews,
              every cup is made to inspire comfort and connection.
            </p>

            <div className="about-card">
              <p>
                Since 2010, we've built a space where people can relax,
                connect, and enjoy premium coffee in a warm atmosphere.
              </p>
            </div>
          </div>

          {/* ✅ SIDE IMAGE (now using constant) */}
          <div className="col-lg-6">
            <img
              src={coffeeImage}
              className="img-fluid about-side-img"
              alt="coffee"
            />
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          id="aboutCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3500"
        >

          {/* ✅ Indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="0" className="active" />
            <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="1" />
            <button type="button" data-bs-target="#aboutCarousel" data-bs-slide-to="2" />
          </div>

          <div className="carousel-inner rounded-4 overflow-hidden">

            <div className="carousel-item active">
              <img src={carouselImage1} className="d-block w-100 about-carousel-img" />
            </div>

            <div className="carousel-item">
              <img src={carouselImage2} className="d-block w-100 about-carousel-img" />
            </div>

            <div className="carousel-item">
              <img src={carouselImage3} className="d-block w-100 about-carousel-img" />
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#aboutCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#aboutCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>

        </div>

        {/* VALUES */}
        <div className="row text-center mt-4 g-4">
          <div className="col-md-4">
            <div className="about-value-card">
              <h5>Quality First</h5>
              <p>We select only premium beans for a rich experience.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-value-card">
              <h5>Sustainability</h5>
              <p>Ethical sourcing and eco-friendly practices.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-value-card">
              <h5>Community</h5>
              <p>A welcoming space to connect and unwind.</p>
            </div>
          </div>
        </div>

     <div className="about-cta mt-5 text-center">
        <h3>Let’s Connect</h3>
        <p>Have questions or want to visit us? We’d love to hear from you.</p>
        <button 
          className="btn about-btn"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </div>
      </div>
    </section>
  );
}