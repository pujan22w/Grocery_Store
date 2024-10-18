// src/components/AllOrders.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./AllOrder.css";

const AllOrders = ({ orders, updateOrderStatus }) => {
  console.log(orders);
  return (
    <div className="all-orders-container">
      <h2>All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Total Amount (Rs)</th>
            <th>Shipping Address</th>
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
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user}</td>
              <td>{order.email}</td>
              <td>{order.totalPrice}</td>
              <td>{order.shippingAddress}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>
                <NavLink
                  to={`/admin/edit-order/${order._id}`}
                  className="edit-btn"
                >
                  Edit
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
