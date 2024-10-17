// src/components/AllProducts.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllProduct.css";

const AllProducts = ({ products, deleteProduct }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Calculate the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      // Filter products by search query
      const filtered = products.filter((product) =>
        product.productname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to the first page after search
    } else {
      // If search query is empty, show all products
      setFilteredProducts(products);
    }
  };
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  // Sync products with filteredProducts when products prop changes
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  console.log(filteredProducts);
  return (
    <div className="all-products-container">
      <h2>All Products</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search product by name..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
        {searchQuery && (
          <button onClick={clearSearch} className="clear-btn">
            Clear
          </button>
        )}
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Is Available</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length === 0 && (
            <tr>
              <td colSpan="8" className="no-products">
                No products available.
              </td>
            </tr>
          )}
          {currentProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
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
              <td>{product.stock}</td>
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
      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
