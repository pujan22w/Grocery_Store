// src/components/EditOrder.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditOrder.css";

const EditOrder = ({ orders, updateOrderStatus }) => {
  const { id } = useParams(); // Order ID
  const navigate = useNavigate();
  const order = orders.find((order) => order.id === id);

  const [deliveryStatus, setDeliveryStatus] = useState(
    order ? order.deliveryStatus : "Pending"
  );

  useEffect(() => {
    if (!order) {
      alert("Order not found!");
      navigate("/orders");
    }
  }, [order, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrderStatus(id, deliveryStatus);
    navigate("/orders");
  };

  if (!order) {
    return null; // Already handled in useEffect
  }

  return (
    <div className="edit-order-container">
      <h2>Edit Order Status</h2>
      <form onSubmit={handleSubmit}>
        {/* Order ID */}
        <div className="form-group">
          <label>Order ID:</label>
          <input type="text" value={order.id} disabled />
        </div>

        {/* Customer Name */}
        <div className="form-group">
          <label>Customer Name:</label>
          <input type="text" value={order.customerName} disabled />
        </div>

        {/* Current Delivery Status */}
        <div className="form-group">
          <label>Current Delivery Status:</label>
          <input type="text" value={order.deliveryStatus} disabled />
        </div>

        {/* Update Delivery Status */}
        <div className="form-group">
          <label>Update Delivery Status:</label>
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Update Status
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/orders")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
