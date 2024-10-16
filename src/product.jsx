// Product.jsx
import React, { useState, useEffect, useContext } from "react";
import { NavBar } from "./navbar.jsx";
import "./product.css";
import FetchFruits from "./fetchApi/fetchFuirts.jsx";
import FetchVegetables from "./fetchApi/fetchVegetable.jsx";
import FetchOil from "./fetchApi/fetchOil.jsx";
import FetchDairy from "./fetchApi/fetchDairy.jsx";
import FetchSnacks from "./fetchApi/fetchSnacks.jsx";
import FetchJuice from "./fetchApi/fetchJuice.jsx";
import { CartContext } from "./addtocart/CartContext.js"; // Import the CartContext
import { Footer } from "./footer.js";
import { UserAuthContext } from "./login-process/loginauth.jsx"; // Import UserAuthContext
import { toast, ToastContainer } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles
import { useNavigate } from "react-router-dom";
function Product() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]); // All fetched products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products currently displayed
  const [visibleCount, setVisibleCount] = useState(24); // Number of products to display
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState(""); // Notification state

  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const { isAuthenticated } = useContext(UserAuthContext); // Access authentication status

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Callback to collect fetched products from child components
  const handleFetch = (products) => {
    setAllProducts((prevProducts) => {
      const combined = [...prevProducts, ...products];
      // Remove duplicates based on unique identifier (_id)
      const unique = Array.from(new Set(combined.map((p) => p._id))).map((id) =>
        combined.find((p) => p._id === id)
      );
      const shuffled = shuffleArray(unique);
      return shuffled;
    });
  };
  const categories = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.category))),
  ];
  const getFilteredProducts = () => {
    let filtered = allProducts;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };
  // Effect to set displayed products when allProducts updates
  useEffect(() => {
    if (allProducts.length > 0) {
      const filtered = getFilteredProducts();
      setDisplayedProducts(filtered.slice(0, visibleCount));
      setLoading(false);
      console.log(
        `Displayed ${filtered.slice(0, visibleCount).length} products`
      ); // Debugging log
    } else {
      setLoading(true);
    }
  }, [allProducts, searchTerm, selectedCategory, visibleCount]);

  // Handle Load More
  const handleLoadMore = () => {
    setVisibleCount(48);
  };

  // Handle Load Less
  const handleLoadLess = () => {
    console.log("load less");
    setVisibleCount(24);
  };

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setVisibleCount(24); // Reset visible count on search
  };

  const handleCategorySelect = (category) => {
    console.log("Category selected:", category);
    setSelectedCategory(category);
    setVisibleCount(24); // Reset visible count on category change
    setSearchTerm(""); // Optional: Reset search term on category change
  };
  // Handle Add to Cart
  const handleAddToCartClick = (product) => {
    if (isAuthenticated) {
      addToCart(product); // Add product to cart via context
      toast.success(`${product.productname} added to cart!`); // Show success notification
    } else {
      toast.error("Please log in to add items to the cart."); // Show error notification
      navigate("/login");
    }
  };
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
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      {/* <!-- Search Bar Section --> */}
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button id="searchBtn">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {/* <!-- Category Buttons --> */}
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* <!-- Product Listings Section --> */}
      <section className="products-listings">
        {loading ? (
          <h1>Loading..........</h1>
        ) : error ? (
          <p className="error">{error}</p>
        ) : displayedProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {displayedProducts.map((product) => (
                <div key={product._id} className="products-item">
                  <img
                    src={product.productImage}
                    alt={product.productname}
                    loading="lazy"
                  />
                  <h4>{product.productname}</h4>
                  <p>Rs.{product.price}</p>
                  <button
                    className="addtocart"
                    onClick={() => handleAddToCartClick(product)}
                    disabled={!isAuthenticated}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Load More / Load Less Buttons */}
            <div className="load-buttons">
              {visibleCount == 24 && getFilteredProducts().length > 24 && (
                <button className="load-more" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
              {visibleCount == 48 && getFilteredProducts().length > 24 && (
                <button className="load-less" onClick={handleLoadLess}>
                  Load Less
                </button>
              )}
            </div>
          </>
        ) : (
          <p>No products available.</p>
        )}
      </section>

      {/* <!-- Footer Section --> */}
      <Footer />

      {/* <!-- Fetch Components (Hidden) --> */}
      {/* These components fetch data and pass it up to the parent via handleFetch */}
      <FetchFruits onFetch={handleFetch} />
      <FetchVegetables onFetch={handleFetch} />
      <FetchOil onFetch={handleFetch} />
      <FetchDairy onFetch={handleFetch} />
      <FetchSnacks onFetch={handleFetch} />
      <FetchJuice onFetch={handleFetch} />
      {/* <FetchBiscuits onFetch={handleFetch} />  */}
    </>
  );
}

export default Product;
