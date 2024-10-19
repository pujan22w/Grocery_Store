// NavBar.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "./login-process/loginauth.jsx";
import { Link } from "react-router-dom";
import { CartContext } from "./addtocart/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./navbar.css";

function NavBar() {
  const { isAuth, user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  // Calculate total items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // State to handle mobile menu and user dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Toggle functions
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    // Close user menu when mobile menu is toggled
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    // Close mobile menu when user menu is toggled
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Function to close both menus
  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo-link" onClick={closeMenus}>
            <img
              src="/photos/grocery-store.jpg"
              className="logo"
              alt="Grocery Store Logo"
            />
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <div className={`navbar-center ${mobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMenus}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenus}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/product" onClick={closeMenus}>
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenus}>
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
        <ToastContainer />
        {/* Right Section: User Auth and Cart */}
        <div className="navbar-right">
          {isAuth ? (
            <div className="after-login">
              {/* User Info */}
              <div className="user-info">
                <button className="user-button" onClick={toggleUserMenu}>
                  <span>Hi, {user ? user : "Guest"}</span>
                  <i className="fas fa-chevron-down arrow"></i>
                </button>
                {userMenuOpen && (
                  <ul className="user-dropdown">
                    <li>
                      <Link to="/profile" onClick={closeMenus}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/order" onClick={closeMenus}>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="logout-button">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Cart */}
              <div className="cart">
                <Link to="/cart" className="cart-link" onClick={closeMenus}>
                  <i className="fas fa-shopping-cart"></i>
                  {totalItems > 0 && (
                    <span className="cart-count">{totalItems}</span>
                  )}
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              LOGIN
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Overlay to close menus when clicking outside */}
      {(mobileMenuOpen || userMenuOpen) && (
        <div className="menu-overlay" onClick={closeMenus}></div>
      )}
    </>
  );
}

export { NavBar };
