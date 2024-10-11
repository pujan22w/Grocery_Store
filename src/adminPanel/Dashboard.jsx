// src/components/Dashboard.js
import React, { useMemo } from "react";
import "./Dashboard.css";

const Dashboard = (props) => {
  const { products, categories } = props;
  console.log(props);
  const totalProducts = useMemo(() => products.length, [products]);
  const totalCategories = useMemo(() => categories.length, [categories]);
  const productsInStock = useMemo(
    () => products.filter((product) => product.inStock).length,
    [products]
  );
  const productsOutOfStock = useMemo(
    () => products.filter((product) => !product.inStock).length,
    [products]
  );
  const averagePrice = useMemo(() => {
    return totalProducts > 0
      ? (
          products.reduce(
            (sum, product) => sum + parseFloat(product.price || 0),
            0
          ) / totalProducts
        ).toFixed(2)
      : 0;
  }, [products, totalProducts]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome to the Grocery Store Admin Panel!</p>
      {totalProducts === 0 ? (
        <p>No products available. Start by adding some products!</p>
      ) : (
        <div className="metrics">
          <div className="metric-card">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>
          <div className="metric-card">
            <h3>Categories</h3>
            <p>{totalCategories}</p>
          </div>
          <div className="metric-card">
            <h3>Products In Stock</h3>
            <p>{productsInStock}</p>
          </div>
          <div className="metric-card">
            <h3>Products Out of Stock</h3>
            <p>{productsOutOfStock}</p>
          </div>
          <div className="metric-card">
            <h3>Average Price (Rs)</h3>
            <p>{averagePrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
