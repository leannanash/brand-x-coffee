import React from "react";
import ScrollableBanner from "../components/reusable/ScrollableBanner";

export default function Contact() {

  const bannerImage = "https://res.cloudinary.com/dro6vrldb/image/upload/v1773746685/25_e33x8y.jpg";

  return (
    <section className="contact-page">

      {/* BANNER */}
      <div className="container-fluid p-0">
        <ScrollableBanner
          title="Contact Us"
          subtitle="We’d love to hear from you — questions, feedback, or just say hello."
          backgroundImage={bannerImage}
        />
      </div>

      <div className="container py-5">

        {/* INFO CARDS */}
        <div className="row g-4 text-center mb-5">
          <div className="col-md-4">
            <div className="contact-card">
              <h5>Address</h5>
              <p>38CJ+FF9, Villongco St, subd, San Pablo City, Laguna, Philippines</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card">
              <h5>Phone</h5>
              <p>
                <a href="tel:09393039528">0939-303-9528</a>
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="contact-card">
              <h5>Hours</h5>
              <p>Daily 1 PM – 9 PM</p>
            </div>
          </div>
        </div>

        {/* FORM + MAP SIDE BY SIDE */}
        <div className="row g-4 align-items-stretch">

          {/* FORM */}
          <div className="col-lg-6">
            <form className="contact-form">

              <h4 className="mb-3">Send us a message</h4>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Your name" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Your email" />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="Write your message..."></textarea>
              </div>

              <button type="submit" className="btn contact-btn w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* MAP */}
          <div className="col-lg-6">
            <div className="map-container h-100">
              <iframe
                title="Brand X Coffee Location"
                src="https://www.google.com/maps?q=14.0711191,121.3312571&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}