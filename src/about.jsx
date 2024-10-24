import React from "react";
import "./about.css";
import { NavBar } from "./navbar.jsx";
import { Footer } from "./footer.js";
function About() {
  return (
    <>
      <NavBar />
      <header className="hero">
        <h2>Fresh Groceries Delivered To Your Doorstep!</h2>
      </header>
      <section class="containerss">
        <div class="fade-in">
          <h2 className="mission">Our Mission</h2>
          <p>
            At Puzu Grocery Store, our mission is to make fresh, high-quality
            groceries easily accessible to everyone, promoting healthy living
            and sustainability.
          </p>
        </div>

        <div class="grid">
          <div class="card fade-in fade-delay">
            <i class="icon fas fa-apple-alt"></i>
            <h3>Freshness</h3>
            <p>
              We ensure that only the freshest products reach your doorstep.
            </p>
          </div>
          <div class="card fade-in fade-delay">
            <i class="icon fas fa-leaf"></i>
            <h3>Quality</h3>
            <p>
              Every product undergoes stringent quality checks to meet our high
              standards.
            </p>
          </div>
          <div class="card fade-in fade-delay">
            <i class="icon fas fa-smile"></i>
            <h3>Customer Satisfaction</h3>
            <p>
              Our priority is ensuring that every customer is happy with their
              shopping experience.
            </p>
          </div>
          <div class="card fade-in fade-delay">
            <i class="icon fas fa-recycle"></i>
            <h3>Sustainability</h3>
            <p>
              We support eco-friendly practices and work with local farmers.
            </p>
          </div>
        </div>
      </section>

      <section className="offers">
        <h2 className="offerh">Our Team</h2>
        <div className="offer">
          <h3>24 Hour Delivery</h3>
          <p>
            At Puzu Grocery Store, we're committed to providing you with
            top-notch service anytime you need it. Our dedicated customer
            support team is available 24/7 to assist you with your inquiries,
            orders, and any concerns you may have. Whether it's day or night,
            we’re here to ensure your shopping experience is seamless and
            satisfying. Your convenience is our priority!
          </p>
        </div>
        <div className="offer">
          <h3>Free Delivery in Butwal and Bhairahawa</h3>
          <p>
            Enjoy hassle-free shopping with Puzu Grocery Store! Get free
            delivery on all orders over Rs 3000 in Butwal and Bhairahawa. Shop
            your favorite groceries and have them delivered straight to your
            door without any additional charges. Don't miss out on this
            fantastic offer—start shopping today!
          </p>
        </div>
      </section>

      <section className="team">
        <h2 className="teamh">Our Team</h2>
        <div className="team-member ceo">
          <h3>Arpin Bhat - CEO</h3>
          <p>
            As the Chief Executive Officer of Puzu Grocery Store, Arpin Bhat
            leads our vision and strategy to provide the best grocery shopping
            experience. With a strong focus on customer satisfaction and
            operational excellence, Arpin oversees all business operations,
            including product sourcing, quality assurance, and customer service
            initiatives.
          </p>
        </div>
        <div className="team-member accountant">
          <h3>Raj Himal - Accountant</h3>
          <p>
            As the Accountant at Puzu Grocery Store, Raj Himal plays a crucial
            role in managing our financial operations. He is responsible for
            maintaining accurate records, overseeing budgets, and ensuring
            compliance with financial regulations. Raj’s expertise in financial
            analysis and reporting helps us make informed decisions,
            contributing to our overall growth and success.
          </p>
        </div>
        <div className="team-member worker">
          <h3>Shiva Raj Giri - Worker</h3>
          <p>
            Shiva Raj Giri is an integral part of the Puzu Grocery Store team,
            dedicated to ensuring smooth daily operations. He assists with
            inventory management, product stocking, and customer service,
            ensuring that our shelves are always well-stocked and our customers
            are satisfied. Shiva's hard work and commitment contribute
            significantly at quality and efficiency of our store.
          </p>
        </div>
      </section>

      <section className="purchase">
        <div className="purchase-container">
          <h2>Wanna Buy a Product?</h2>
          <div className="get-product">
            <a href="/product">Get Product</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
