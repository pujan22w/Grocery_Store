// CartContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        // If the product is already in the cart, increase its quantity
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product is new to the cart, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to increment the quantity of a cart item
  const increment = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrement the quantity of a cart item
  const decrement = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  // Calculate total price of the cart
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      increment,
      decrement,
      removeFromCart,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
