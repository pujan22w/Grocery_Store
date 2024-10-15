import React, { useContext } from "react";
import { UserAuthContext } from "./login-process/loginauth.jsx";
import { Link } from "react-router-dom";
import { CartContext } from "./addtocart/CartContext";
function NavBar() {
  const { isAuthenticated, user, logout } = useContext(UserAuthContext);
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);

  // Calculate total items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <nav>
        <Link to="/" className="logo-link">
          <img src="./photos\grocery-store.jpg" className="logo" />
        </Link>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT </Link>
          </li>
          <li>
            <Link to="/product">PRODUCTS </Link>
          </li>
          <li>
            <Link to="/contact">CONTACT </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <>
                <div className="after-login">
                  <div className="user-info">
                    <a>
                      <span>
                        Hi,
                        {user}
                      </span>
                    </a>
                    <ul>
                      <li>
                        <a> My Profile</a>
                      </li>
                      <li>
                        <button onClick={logout} className="logout-button">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="cart">
                    <ul>
                      <li>
                        <Link to="/cart" className="cart-link">
                          <i className="fas fa-shopping-cart"></i>
                          {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login">LOGIN</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
export { NavBar };
