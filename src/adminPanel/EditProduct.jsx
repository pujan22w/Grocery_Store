// src/components/EditProduct.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios.js";
import "./EditProduct.css";

const EditProduct = ({ products, categories, updateProduct }) => {
  const { id } = useParams();
  const productToEdit = id;
  console.log(productToEdit);
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  useEffect(() => {
    const dataaa = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/${productToEdit}`
      );
      setProductData(response.data.data);
    };
    dataaa();
  }, []);
  console.log(ProductData);

  const [product, setProduct] = useState({
    productname: "",
    category: "",
    productImage: "", // base64-encoded
    price: "",
    weight: "",
    isavailable: true,
    stock: 50,
  });
  console.log(product);
  useEffect(() => {
    if (ProductData) {
      setProduct((prev) => ({
        ...prev,
        productImage: ProductData.productImage, // Set current image without allowing it to change
        productname: ProductData.productname,
        category: ProductData.category,
        price: ProductData.price,
        weight: ProductData.weight,
        isavailable: ProductData.isavailable,
      }));
    }
  }, [ProductData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => {
      const newProduct = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      console.log("Updated Product State:", newProduct); // Log updated state
      return newProduct;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/product/${productToEdit}`,
        {
          productname: product.productname,
          category: product.category,
          price: product.price,
          weight: product.weight,
          isavailable: product.isavailable,
          stock: 50,
        }
      );
      const updatedProduct = response.data.data;

      updateProduct(ProductData, updatedProduct);
      alert("Product Updated successfully");
      navigate("/admin/all-products");
      // Optionally, redirect or show a success message
    } catch (err) {
      console.error("Error updating the product:", err);
      // Optionally, show an error message to the user
    }
  };

  if (!productToEdit) {
    return (
      <div className="edit-product-container">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productname"
            value={product.productname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Image:</label>
          <input type="file" accept="image/*" disabled />
          {product.image && (
            <img
              src={product.productImage}
              alt="Product"
              className="product-image-preview"
            />
          )}
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (Rs):</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Weight */}
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* In Stock */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="isavailable"
            checked={product.isavailable}
            onChange={handleChange}
            id="inStockCheckEdit"
          />
          <label htmlFor="inStockCheckEdit">In Stock</label>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Update
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/all-products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
