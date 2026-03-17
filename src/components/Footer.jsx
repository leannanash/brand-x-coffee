import React from "react";
import logo from "../assets/imgs/logo.jpg";
import payment from "../assets/imgs/payment.jpg";

// Instagram images
import insta1 from "../assets/products/1.jpg";
import insta2 from "../assets/products/2.jpg";
import insta3 from "../assets/products/3.jpg";
import insta4 from "../assets/products/4.jpg";
import insta5 from "../assets/products/5.jpg";

const socialLinks = [
  { icon: "facebook-f", label: "Facebook", href: "#" },
  { icon: "instagram", label: "Instagram", href: "#" },
  { icon: "twitter", label: "Twitter", href: "#" },
];

const instaImages = [insta1, insta2, insta3, insta4, insta5];

export default function Footer() {
  return (
    <footer className="coffee-footer">
      <div className="footer-container">
        {/* Top row */}
        <div className="footer-top d-flex flex-wrap justify-content-between align-items-start">
          {/* Brand */}
          <div className="footer-col">
            <img className="footer-logo mb-3" src={logo} alt="Brand X Coffee Logo" />
            <p className="footer-text">
              Serving the finest coffee and delicious rice meals daily. Brewed with love, crafted for you.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5 className="footer-heading">Contact Us</h5>
            <div className="footer-contact">
              <p><strong>Address:</strong> Blk Lot 20, San Pablo City</p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:09763380825" className="footer-link">09763380825</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:leandominiclopez@gmail.com" className="footer-link">
                  leandominiclopez@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className="footer-col">
            <h5 className="footer-heading">Instagram</h5>
            <div className="footer-insta">
              {instaImages.map((img, i) => (
                <div key={i} className="insta-img">
                  <img src={img} alt={`Instagram post ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom row */}
        <div className="footer-bottom d-flex flex-wrap align-items-center justify-content-between">
          <img src={payment} alt="Payment Methods" className="footer-payment" />
          <div className="footer-copy">
            © {new Date().getFullYear()} Brand X Coffee. All Rights Reserved.
          </div>
          <div className="footer-social d-flex gap-3">
            {socialLinks.map((social) => (
              <a key={social.icon} href={social.href} aria-label={social.label}>
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}