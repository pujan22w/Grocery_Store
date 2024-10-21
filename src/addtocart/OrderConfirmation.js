// src/checkout/OrderConfirmation.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./OrderConfirmation.css";
 // Create this CSS file for styling

function OrderConfirmation() {
  return (
    <div className="order-confirmation-container">
      <h2>Thank You for Your Order!</h2>
      <p>
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </p>
      <Link to="/order" className="see-order-link">
        See Order
      </Link>
      <Link to="/" className="back-home-link">
        Back to Home
      </Link>
    </div>
  );
}

export default OrderConfirmation;
