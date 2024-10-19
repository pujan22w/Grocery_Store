// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import AdminLogout from "../admin/admin-logout";


const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <h2 className="sidebar-logo">
          {" "}
          <span>
            {" "}
            <img src="../photos\grocery-store.jpg" alt="logo" />{" "}
          </span>
          Grocery Admin
        </h2>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className="sidebar-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/categories" className="sidebar-link">
            Categories
          </NavLink>
          <NavLink to="/admin/add-product" className="sidebar-link">
            Add Product
          </NavLink>
          <NavLink to="/admin/all-products" className="sidebar-link">
            All Products
          </NavLink>
          <NavLink to="/admin/all-order" className="sidebar-link">
            All Order
          </NavLink>
         
          <AdminLogout />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
