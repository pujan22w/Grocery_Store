// AddToCart.jsx
import React, { useContext } from "react";
import { CartContext } from "./CartContext.js";
import "./AddToCart.css"; // Create this CSS file for styling
import { NavBar } from "../navbar.jsx";
import { Link } from "react-router-dom";
const AddToCart = () => {
  const { cartItems, increment, decrement, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.productImage}
                    alt={item.productname}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.productname}</h3>
                    <p>Unit Price: Rs.{item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => decrement(item._id)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increment(item._id)}>+</button>
                    </div>
                    <p>Total: Rs.{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total Price: Rs.{totalPrice}</h3>
            </div>
            <div className="checkout-button">
              <Link to="/checkout">Proceed to Checkout </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCart;
