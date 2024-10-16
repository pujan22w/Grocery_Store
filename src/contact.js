import React from "react";
import "./contact.css";
import { NavBar } from "./navbar.jsx";
import { Footer } from "./footer.js";
function ContactUs() {
  return (
    <>
      <header className="header-section">
        <NavBar />
      </header>

      {/* <!-- Contact Section --> */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2>Get in Touch</h2>
          <p>
            We would love to hear from you. Drop us a message or reach out via
            social media.
          </p>
          <form action="#" method="POST" className="contact-form">
            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="input-group">
              <textarea placeholder="Your Message" rows="4" required></textarea>
            </div>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="social-icon instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-icon tiktok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContactUs;
