// src/components/AllProducts.js
import React from "react";
import { Link } from "react-router-dom";
import "./AllProduct.css";

const AllProducts = ({ products, deleteProduct }) => {
  return (
    <div className="all-products-container">
      <h2>All Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Is Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="7" className="no-products">
                No products available.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.productImage ? (
                  <img
                    src={product.productImage}
                    alt={product.productname}
                    className="product-image"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="product-name-add">{product.productname}</td>
              <td>{product.category}</td>
              <td>{parseFloat(product.price).toFixed(2)}</td>
              <td>{product.weight}</td>
              <td>{product.isavailable ? "Yes" : "No"}</td>
              <td>
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
