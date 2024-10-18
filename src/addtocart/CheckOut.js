// src/checkout/Checkout.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../addtocart/CartContext";
import { AuthContext } from "../login-process/loginauth.jsx";
import "./CheckOut.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../lib/axios"; // Import Axios

function CheckOut() {
  const { cartItems, totalPrice, removeFromCart, clearCart } =
    useContext(CartContext);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(
      cartItems.map((i) => {
        return i.quantity;
      })
    );
    e.preventDefault();
    if (!isAuth) {
      toast.error("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (paymentMethod === "COD") {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat(totalPrice),
      };

      try {
        setIsLoading(true); // Start loading
        // Make POST request to the API
        const response = await axios.post(
          "http://localhost:8000/api/v1/order",
          orderData
        );

        if (response.status === 201 || response.status === 200) {
          toast.success("Order placed successfully!");
          clearCart();
          navigate("/order-confirmation"); // Redirect to home or order confirmation page
        } else {
          toast.error("Failed to place order. Please try again.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("An error occurred while placing your order.");
      } finally {
        setIsLoading(false);
      }
    } else if (paymentMethod === "eSewa") {
      toast.info("Redirecting to eSewa for payment...");
      //(Replace with actual eSewa payment URL)
      window.location.href = "https://esewa.com.np/";
    }
  };

  if (!isAuth) {
    toast.error("Please log in to proceed to checkout.");
    navigate("/login");
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. Please add products to your cart before proceeding
          to checkout.
        </p>
      ) : (
        <>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Unit Price (Rs.)</th>
                <th>Quantity</th>
                <th>Total Price (Rs.)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.productImage}
                      alt={item.productname}
                      className="checkout-product-image"
                    />
                  </td>
                  <td className="product-name">{item.productname}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="checkout-summary">
            <h3>Total Amount: Rs.{totalPrice}</h3>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <h3>Select Payment Method:</h3>
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img
                  src="photos\cashondelivery.png" // Add your image path here
                  alt="Cash on Delivery"
                  className={`payment-image ${
                    paymentMethod === "COD" ? "selected" : ""
                  }`}
                />
              </label>
              <label>
                <input
                  type="radio"
                  value="eSewa"
                  checked={paymentMethod === "eSewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img
                  src="photos\esewa_og.webp" // Add your image path here
                  alt="eSewa"
                  className={`payment-image ${
                    paymentMethod === "eSewa" ? "selected" : ""
                  }`}
                />
              </label>
            </div>
            <ToastContainer />
            <button type="submit" className="checkout-button-proceed">
              Proceed to Payment
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default CheckOut;
