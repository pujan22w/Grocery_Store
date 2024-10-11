// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import AdminLogout from "../admin/admin-logout";

const Sidebar = () => {
  return (
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
        <NavLink
          to="/admin/dashboard"
          // activeClassName="active-link"
          className="sidebar-link"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/categories"
          // activeClassName="active-link"
          className="sidebar-link"
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/add-product"
          // activeClassName="active-link"
          className="sidebar-link"
        >
          Add Product
        </NavLink>
        <NavLink
          to="/admin/all-products"
          // activeClassName="active-link"
          className="sidebar-link"
        >
          All Products
        </NavLink>
        <AdminLogout />
      </nav>
    </div>
  );
};

export default Sidebar;
