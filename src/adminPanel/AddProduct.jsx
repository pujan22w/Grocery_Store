// src/components/AddProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import axios from "../lib/axios";
import { toast, ToastContainer } from "react-toastify";
const AddProduct = ({ categories, addProduct, products }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: categories.length > 0 ? categories[0] : "",
    image: "",
    price: "",
    weight: "",
    isavailable: true,
    stock: "",
  });
  console.log(product);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Reset error on input change
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file); //convert image to base64
    }
  };

  const isDuplicateProduct = (name) => {
    // Case-insensitive comparison
    return products.some((existingProduct) => existingProduct.name === name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim the product name to remove leading/trailing spaces
    const trimmedName = product.name.trim();

    if (!trimmedName) {
      setError("Product name is required.");
      return;
    }

    // Check for duplicate product
    if (isDuplicateProduct(trimmedName)) {
      setError("A product with this name already exists.");
      alert("Product already inserted");
      return;
    }
    const formData = new FormData();
    formData.append("productname", trimmedName);
    formData.append("category", product.category);
    formData.append("productImage", product.image);
    formData.append("price", product.price);
    formData.append("weight", product.weight);
    formData.append("isavailable", product.isavailable);

    formData.append("stock", product.stock);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/register",
        formData
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        toast.success("Product added successfully", {
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
        setInterval(() => {
          addProduct({ ...product, name: trimmedName });
          navigate("/admin/add-product");
        }, 1000);
        // alert("Product added successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      setError("Failed to add product. Please try again later.");
    }

    // Proceed to add the product

    // alert("Product added successfully!");
    // navigate("/admin/all-products");
  };

  return (
    <>
      <ToastContainer />
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Product Name */}
          <div className="form-group" key={product}>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {product.productImage && (
              <img
                src={product.productImage}
                alt="Product"
                className="product-image-preview"
              />
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
          </div>

          {/* Weight */}
          <div className="form-group">
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              required
              placeholder="Enter weight"
            />
          </div>
          {/* In Stock */}
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              placeholder="Enter Stock"
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              name="is-available"
              checked={product.isavailable}
              onChange={handleChange}
              id="is-available"
            />
            <label htmlFor="is-available">Is Available</label>
          </div>

          {/* Display Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save
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
    </>
  );
};

export default AddProduct;
