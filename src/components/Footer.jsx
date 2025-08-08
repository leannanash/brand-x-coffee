import React from "react";
import logo from "../assets/imgs/logo.jpg";
import payment from "../assets/imgs/payment.jpg";

// Replace these with your coffee-related Instagram images
import insta1 from "../assets/products/1.jpg";
import insta2 from "../assets/products/2.jpg";
import insta3 from "../assets/products/3.jpg";
import insta4 from "../assets/products/4.jpg";
import insta5 from "../assets/products/5.jpg";

export default function Footer() {
  return (
    <footer className="mt-5 py-5 bg-light">
      <div className="row container mx-auto pt-5">
        <div className="footer-one col-lg-3 col-md-6 col-sm-12">
          <img className="logo" src={logo} alt="Brand X Coffee Logo" />
          <p className="pt-3">
            Serving the finest coffee and delicious rice meals daily.
          </p>
        </div>

        <div className="footer-one col-lg-3 col-md-6 col-sm-12">
          <h5 className="pb-2">Menu</h5>
          <ul className="text-uppercase list-unstyled">
            {["Coffee", "Matcha", "Milk-Based Drinks", "Rice Meals", "Snacks"].map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-one col-lg-3 col-md-6 col-sm-12">
          <h5 className="pb-2">Contact Us</h5>
          <div>
            <h6 className="text-uppercase">Address</h6>
            <p>Blk Lot 20, San Pablo City</p>
          </div>
          <div>
            <h6 className="text-uppercase">Phone</h6>
            <p>09763380825</p>
          </div>
          <div>
            <h6 className="text-uppercase">Email</h6>
            <p>leandominiclopez@gmail.com</p>
          </div>
        </div>

        <div className="footer-one col-lg-3 col-md-6 col-sm-12">
          <h5 className="pb-2">Instagram</h5>
          <div className="row">
            {[insta1, insta2, insta3, insta4, insta5].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Instagram ${i + 1}`}
                className="img-fluid w-25 h-100 m-2"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="copyright mt-5">
        <div className="row container mx-auto">
            <div className="col-lg-3 col-md-5 col-sm-12 mb-4">
                <img
                    className="payment-logo"
                    src={payment}
                    alt="Payment Methods"
                />
            </div>
          <div className="col-lg-3 col-md-5 col-sm-12 mb-4 text-nowrap mb-2">
            <p>Brand X Coffee © 2025 All Rights Reserved</p>
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12 mb-4">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
