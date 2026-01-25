import React from "react";

export default function Contact() {
  return (
    <section className="contact-page">
      {/* Hero Banner */}
      <div className="contact-hero position-relative mb-5">
        <div className="contact-overlay" />
        <div className="container text-center text-white position-relative" style={{ zIndex: 2 }}>
          <h2 className="contact-title animate-fadeInUp">Contact Us</h2>
          <p className="contact-subtitle animate-fadeInUp">
            Questions, feedback, or orders? Reach out anytime and we'll get back to you quickly.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mb-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp">
              <h5>📍 Address</h5>
              <p>San Pablo City, Laguna</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp">
              <h5>📞 Phone</h5>
              <p><a href="tel:09393039528">0939-303-9528</a></p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card animate-fadeInUp">
              <h5>🕒 Hours</h5>
              <p>Daily 1 PM – 9 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form className="contact-form animate-fadeInUp">
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-gradient w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="container mb-5">
        <div className="map-container animate-fadeInUp">
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
