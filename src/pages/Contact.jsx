import React from "react";
import ScrollableBanner from "../components/reusable/ScrollableBanner";

export default function Contact() {
  return (
    <section className="contact-page">
      {/* HERO BANNER */}
      <ScrollableBanner
        title="Contact Us"
        subtitle="Questions, feedback, or orders? Reach out anytime and we'll get back to you quickly."
        backgroundImage="https://res.cloudinary.com/dro6vrldb/image/upload/v1773746685/25_e33x8y.jpg"
      />

      {/* CONTACT INFO CARDS */}
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp text-center p-4 shadow-sm rounded">
              <h5 className="mb-2">📍 Address</h5>
              <p>San Pablo City, Laguna</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp text-center p-4 shadow-sm rounded">
              <h5 className="mb-2">📞 Phone</h5>
              <p>
                <a href="tel:09393039528" className="text-decoration-none">
                  0939-303-9528
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp text-center p-4 shadow-sm rounded">
              <h5 className="mb-2">🕒 Hours</h5>
              <p>Daily 1 PM – 9 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form className="contact-form animate-fadeInUp shadow-sm p-4 rounded bg-dark text-white">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-gradient w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="container my-5">
        <div className="map-container animate-fadeInUp rounded overflow-hidden shadow">
          <iframe
            title="Brand X Coffee Location"
            src="https://www.google.com/maps?q=14.0711191,121.3312571&z=17&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}