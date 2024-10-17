import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import "./MyOrder.css";
import { NavBar } from "../navbar.jsx";
import { Footer } from "../footer.js";

function MyOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To capture any errors

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Optionally, you can set headers or include authentication tokens here
        const response = await axios.get(
          "http://localhost:8000/api/v1/order/me"
        );
        setData(response.data.message.order);
        // Store only the data from the response
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchOrders(); // Invoke the fetch function when the component mounts
  }, []);
  console.log(
    data.map((e) => {
      return e.orderItems;
    })
  );

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <>
      <NavBar />
      <div className="my-order-container">
        <h1>My Orders</h1>
        {data.length > 0 ? (
          data.map((order) => (
            <div key={order._id} className="order-card">
              <h2>Order ID: {order._id}</h2>
              <p>
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`status-badge ${order.status.toLowerCase()}`}
                  data-tooltip={`Order is currently ${order.status}`}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Total Price:</strong> Rs.{order.totalPrice}
              </p>
              <h3>Order Items:</h3>
              <ul className="order-items">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <span className="item-name">{item.name}</span> - Quantity:{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyOrder;
