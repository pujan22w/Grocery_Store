// src/components/AllOrders.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./AllOrder.css";

const AllOrders = ({ orders, deleteOrder, updateOrderStatus }) => {
  return (
    <div className="all-orders-container">
      <h2>All Orders</h2>
      <NavLink to="/add-order" className="add-order-btn">
        Add New Order
      </NavLink>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Total Amount (Rs)</th>
            <th>Order Date</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="no-orders">
                No orders available.
              </td>
            </tr>
          )}
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.customerEmail}</td>
              <td>{order.totalAmount.toFixed(2)}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.deliveryStatus}</td>
              <td>
                <NavLink to={`/edit-order/${order.id}`} className="edit-btn">
                  Edit
                </NavLink>
                <button
                  className="delete-btn"
                  onClick={() => deleteOrder(order.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
