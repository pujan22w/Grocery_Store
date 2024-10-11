// src/components/AddOrder.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css";

const AddOrder = ({ categories, products, addOrder }) => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("Pending");

  // Handle product selection and quantity
  const handleProductChange = (productId, quantity) => {
    if (quantity < 1) return;

    const existingProduct = selectedProducts.find(
      (p) => p.productId === productId
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.productId === productId ? { ...p, quantity: parseInt(quantity) } : p
        )
      );
    } else {
      const product = products.find((p) => p.id === productId);
      setSelectedProducts([
        ...selectedProducts,
        { productId, name: product.name, quantity, price: product.price },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !customerEmail || selectedProducts.length === 0) {
      alert("Please fill in all fields and add at least one product.");
      return;
    }

    const totalAmount = selectedProducts.reduce(
      (total, p) => total + p.price * p.quantity,
      0
    );
    const orderDate = new Date().toISOString();

    const newOrder = {
      customerName,
      customerEmail,
      products: selectedProducts,
      totalAmount,
      orderDate,
      deliveryStatus,
    };

    addOrder(newOrder);
    navigate("/orders");
  };

  return (
    <div className="add-order-container">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Name */}
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        {/* Customer Email */}
        <div className="form-group">
          <label>Customer Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>

        {/* Select Products */}
        <div className="form-group">
          <label>Select Products:</label>
          {categories.map((category, idx) => (
            <div key={idx} className="category-group">
              <h4>{category}</h4>
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <div key={product.id} className="product-item">
                    <input
                      type="checkbox"
                      id={product.id}
                      onChange={(e) =>
                        e.target.checked
                          ? setSelectedProducts([
                              ...selectedProducts,
                              {
                                productId: product.id,
                                name: product.name,
                                quantity: 1,
                                price: product.price,
                              },
                            ])
                          : setSelectedProducts(
                              selectedProducts.filter(
                                (p) => p.productId !== product.id
                              )
                            )
                      }
                      checked={selectedProducts.some(
                        (p) => p.productId === product.id
                      )}
                    />
                    <label htmlFor={product.id}>
                      {product.name} (${product.price})
                    </label>
                    {selectedProducts.some(
                      (p) => p.productId === product.id
                    ) && (
                      <input
                        type="number"
                        min="1"
                        value={
                          selectedProducts.find(
                            (p) => p.productId === product.id
                          ).quantity
                        }
                        onChange={(e) =>
                          handleProductChange(product.id, e.target.value)
                        }
                        className="quantity-input"
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Delivery Status */}
        <div className="form-group">
          <label>Delivery Status:</label>
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Add Order
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/orders")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
