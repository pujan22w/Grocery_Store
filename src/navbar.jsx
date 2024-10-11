import React, { useContext } from "react";
import { UserAuthContext } from "./login-process/loginauth.jsx";
import { Link } from "react-router-dom";
function NavBar() {
  const { isAuthenticated, user, logout } = useContext(UserAuthContext);

  return (
    <>
      <nav>
        <Link to="/" className="logo-link">
          <h1 className="logo">Grocery Store</h1>
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
              <div className="user-info">
                <span>Hi, {user}</span>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
export { NavBar };
