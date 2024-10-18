// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Categories from "./Categories";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProduct";
import EditProduct from "./EditProduct";
import AllOrders from "./AllOrder"; // New Orders Component
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder.jsx";
import axios from "../lib/axios.js";
import "./AppComponent.css";

function AppAdminComponent() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved
      ? JSON.parse(saved)
      : ["Fruits", "Vegetables", "Dairy", "Bakery"];
  });

  // Initialize products from localStorage or empty array
  const [products, setProducts] = useState([]);
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const productValue = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/product/");
      let data = await response.data;
      setProducts(data.data.products);
    };
    productValue();
  }, []);
  // const [id, setID]=useState([]);
  const productId = products.map((e) => {
    return e._id;
  });
  // console.log(productId);

  // Add a new product
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // Delete a product by index
  const deleteProduct = async (productId) => {
    console.log("Deleting product with ID:", productId);
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/product/${productId}`
      );
      console.log("Response Data", response.data);

      if (response.status === 200 || response.status === 204) {
        // Successfully deleted
        // Proceed to update the UI
        const newProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(newProducts);
        alert("Product deleted successfully.");
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response:", response.data);
        alert("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred while deleting the product.");
      }
    }
  };

  // Update a product by index
  const updateProduct = (productId, updatedProduct) => {
    const newProducts = products.map((product) =>
      productId === parseInt(productId) ? updatedProduct : product
    );
    setProducts(newProducts);
  };
  const [orders, setOrder] = useState([]);
  useEffect(() => {
    const AllOrder = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/order");
      const data = await response.data.data.order;
      setOrder(data);
    };
    AllOrder();
  }, []);
  console.log(
    orders.map((e) => {
      return e.status, e._id;
    })
  );
   const updateOrderStatus = async (orderId, deliveryStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/order/${deliveryStatus}/${orderId}`, // API endpoint to update the specific order
        {
          status: deliveryStatus, 
        }
      );
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard products={products} categories={categories} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/add-product"
            element={
              <AddProduct
                categories={categories}
                addProduct={addProduct}
                products={products}
              />
            }
          />

          <Route
            path="/all-products"
            element={
              <AllProducts products={products} deleteProduct={deleteProduct} />
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <EditProduct
                products={products}
                updateOrderStatus={updateOrderStatus}
              />
            }
          />
          <Route
            path="/all-order"
            element={
              <AllOrders
                orders={orders}
                categories={categories}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/edit-order/:id"
            element={
              <EditOrder
                orders={orders}
                categories={categories}
                updateOrderStatus={updateOrderStatus}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AppAdminComponent;
