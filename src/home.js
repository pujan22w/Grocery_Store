import React from "react";
import { NavBar } from "./navbar.jsx";
import { Footer } from "./footer.js";
import "./index.css";

function Home() {
  return (
    <>
      {/* <!-- Header Section --> */}
      <header className="header-section">
        <NavBar />
        <div className="header-content">
          <h2>Fresh Groceries Delivered to Your Doorstep</h2>
          <p>Experience the taste of freshness like never before</p>
          <br />
          <a href="/product" className="signin-button">
            Get Started
          </a>
        </div>
      </header>
      {/* <!-- About Section --> */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              At Grocery Store, we believe in delivering the freshest and finest
              products straight to your doorstep. From organic vegetables to
              everyday essentials, we are committed to providing high-quality
              groceries for you and your family.
            </p>
            <a href="/about" className="learn-more-button">
              Learn More
            </a>
          </div>
          <div className="about-image">
            <img src="./5.jpg" alt="About us image" />
          </div>
        </div>
      </section>

      {/* <!-- Products Section --> */}
      <section id="products" className="product-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-item">
            <img src="photos/vegetable.jpg" alt="Product 1" loading="lazy" />
            <h3>Fresh Vegetables</h3>
            <p>Healthy and organic vegetables.</p>
          </div>
          <div className="product-item">
            <img src="photos/fruits.png" alt="Product 2" />
            <h3>Fruits</h3>
            <p>Fresh and juicy fruits delivered to you.</p>
          </div>
          <div className="product-item">
            <img src="photos/dairy.png" alt="Product 3" />
            <h3>Dairy Products</h3>
            <p>High-quality dairy for your health.</p>
          </div>
        </div>
      </section>

      {/* <!-- Contact Section --> */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any inquiries.</p>
        <div className="icons">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>
      </section>

      {/* <!-- Footer Section  */}
      <Footer />
    </>
  );
}
export default Home;
