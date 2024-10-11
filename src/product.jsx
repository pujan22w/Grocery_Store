import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./navbar.jsx";
import "./product.css";
import FetchFruits from "./fetchApi/fetchFuirts.jsx";
import FetchVegetables from "./fetchApi/fetchVegetable.jsx";
import FetchOil from "./fetchApi/fetchOil.jsx";

function Product() {
  return (
    <>
      {/* <!-- Header Section --> */}
      <header className="products-header">
        <NavBar />
        <div className="header-content">
          <h1>Our Products</h1>
          <p>Fresh groceries delivered to your door</p>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          id="searchInput"
          placeholder="Search for products..."
        />
        <button id="searchBtn">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* <!-- Product Categories Section --> */}
      <section className="categoriesbbfgg">
        <h2>Product Categories</h2>
        <div className="category-list">
          <a href="#fruits" className="category-link">
            Fruits
          </a>
          <a href="#vegetables" className="category-link">
            Vegetables
          </a>
          <a href="#snacks" className="category-link">
            Snacks
          </a>
          <a href="#dairy-products" className="category-link">
            Dairy Products
          </a>
          <a href="#biscuits" className="category-link">
            Biscuits
          </a>
        </div>
      </section>

      {/* <!-- Product Listings Section --> */}

      {/* <!-- Fruits Section --> */}
      <section id="fruits" className="products-listings">
        <h2>Fruits</h2>
        <div className="products-grid">
          <FetchFruits />
        </div>
      </section>

      {/* <!-- Vegetables Section --> */}
      <section id="vegetables" className="products-listings">
        <h2>Vegetables</h2>
        <div className="products-grid">
          <FetchVegetables />
        </div>
      </section>

      {/* <!-- Oil Section --> */}
      <section id="snacks" className="products-listings">
        <h2>Snacks</h2>
        <div className="products-grid">
          <FetchOil />
          {/* <div className="products-item">
            <img src=".\photos\swastik-oil-500x500.webp" alt="Cooking Oil" />
            <h4>Swastik Oil</h4>
            <p>Rs.120.00</p>
            <button>Add to Cart</button>
          </div>
          <div className="products-item">
            <img
              src=".\photos\dhara-health-one-f003545a.jpeg"
              alt="Cooking Oil"
            />
            <h4>Dhara Oil</h4>
            <p>Rs.120.00</p>
            <button>Add to Cart</button>
          </div> */}
          {/* <!-- Add more oil products as needed --> */}
        </div>
      </section>

      {/* <!-- Dairy Products Section --> */}
      <section id="dairy-products" className="products-listings">
        <h2>Dairy Products</h2>
        <div className="products-grid">
          <div className="products-item">
            <img src=".\photos\milk.jpeg" alt="Milk" />
            <h4>Milk</h4>
            <p>Rs.30.00</p>
            <button>Add to Cart</button>
          </div>
          <div className="products-item">
            <img src=".\photos\2.jpg" alt="Cheese" />
            <h4>Cheese</h4>
            <p>Rs.900.00/kg</p>
            <button>Add to Cart</button>
          </div>
          {/* <!-- Add more dairy products as needed --> */}
        </div>
      </section>

      {/* <!-- Biscuits Section --> */}
      <section id="biscuits" className="products-listings">
        <h2>Biscuits</h2>
        <div className="products-grid">
          <div className="products-item">
            <img src=".\photos\20-20.jpg" alt="20-20" />
            <h4>20-20</h4>
            <p>Rs.10.00</p>
            <button>Add to Cart</button>
          </div>
          <div className="products-item">
            <img src=".\photos\oreo.jpeg" alt="Oreo" />
            <h4>Oreo</h4>
            <p>Rs.20.00</p>
            <button>Add to Cart</button>
          </div>
          {/* <!-- Add more biscuits as needed --> */}
        </div>
      </section>

      {/* <!-- Footer Section --> */}
      <footer className="footer">
        <p>&copy; 2024 Puzu Grocery Store. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Product;
