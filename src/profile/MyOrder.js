import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import "./MyOrder.css";
import { NavBar } from "../navbar.jsx";
import { Footer } from "../footer.js";
import { toast, ToastContainer } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css";
function MyOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [id, SetOrderId] = useState([]);
  const [error, setError] = useState(null);
  // To capture any errors
  const [deliveryStatus, setDeliveryStatus] = useState("PENDING");

  // console.log(id);
  // console.log(deliveryStatus);
  useEffect(() => {
    const OrderId = () => {
      data.map((e) => {
        console.log(e._id);
        SetOrderId([e._id]);
        setDeliveryStatus("cancle");
      });
    };
    OrderId();
  }, [data]);
  const handleCancel = (orderId, status) => {
    if (status === "SHIPPED" || status === "DELIVERED") {
      toast.success("Order cannot be canceled now");
      // setToggleMessage("Order cannot be canceled now.");
    } else {
      setTimeout(() => {
        updateOrderStatus(orderId, "cancle");
      }, 500);
      // setToggleMessage(""); // Clear the toggle message if successfully canceled
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const deleted = await axios.delete(
        `http://localhost:8000/api/v1/order/delete/order/${orderId}`
      );

      if (deleted.data.statusCode == 200 || deleted.data.statusCode == 201) {
        toast.success("Order Deleted Successfully", {
          position: "top-right",
          // className: "notification",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          setData(data.filter((order) => order._id !== orderId));
        }, 800);
      }
    } catch (error) {
      toast.error("Error while deleting order");
      console.error("Error deleting order:", error);
    }
  };

  const updateOrderStatus = async (OrderId, deliveryStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/order/${deliveryStatus}/${OrderId}`, // API endpoint to update the specific order
        {
          orderid: OrderId,
          status: deliveryStatus,
        }
      );
      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        toast.success("Order Cancelled Successfully", {
          position: "top-right",
          // className: "notification",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      console.log(response.data.statusCode); // Handle the response as needed
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Optionally, you can set headers or include authentication tokens here
        const response = await axios.get(
          "http://localhost:8000/api/v1/order/me"
        );
        setData(response.data.message.order);
        console.log(response.data);
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
  console.log(data);
  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;
  console.log(
    data.map((e) => {
      return e.status;
    })
  );
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="my-order-container">
        <h1>My Orders</h1>
        {data.length > 0 ? (
          data.map((order) => (
            <div key={order._id} className="order-card">
              <h2>Order </h2>
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
              {/* Conditionally show Cancel button based on status */}

              {order.status === "CANCELED" || order.status === "DELIVERED" ? (
                <button
                  className="delete"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete Order
                </button>
              ) : order.status === "SHIPPED" ? (
                <p className="status-message">
                  Order cannot be canceled or deleted.
                </p>
              ) : (
                <button
                  className="cancelled"
                  onClick={() => handleCancel(order._id, order.status)}
                >
                  Cancel Order
                </button>
              )}

              {/* Display toggle message for cancellation restrictions */}
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
