import React from "react";
import { NavBar } from "./navbar.jsx";
import "./item-description.css";
import { Footer } from "./footer.js";
function ItemsProducts() {
  return (
    <>
      <NavBar />
      <div className="first-tag">
        <div className="image">
          <img src="photos\apple.jpeg" alt="items-image" />
        </div>
        <div className="list-items">
          <h2>Apple</h2>
          <h5>Rs 120</h5>
          <p>
            Apple, priced at NPR 120 per kg, is a crisp and refreshing fruit,
            rich in fiber, vitamins, and antioxidants. Perfect for a healthy
            snack or for adding flavor to salads and desserts. Enjoy its natural
            sweetness and crunchy texture!
          </p>
          <div className="cart-items">
            <button>
              <i className="fa-solid fa-plus increase"></i>
            </button>
            <h6>1</h6>
            <button>
              <i className="fa-solid fa-minus decrease"></i>
            </button>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="feature-products">
        <div className="offer-container">
          <span className="line"></span>
          <span className="offer-text">Feature Products</span>
          <span className="line"></span>
        </div>
      </div>

      <div className="items-all">
        <div className="items-list">
          <div className="item-1">
            <img src="photos/bananas.png" alt="item-1" />
            <div className="item-1-list">
              <h5>Banana</h5>
              <h6>Rs.100</h6>
              <div className="cart">
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="items-list">
          <div className="item-1">
            <img src="photos/bananas.png" alt="item-1" />
            <div className="item-1-list">
              <h5>Banana</h5>
              <h6>Rs.100</h6>
              <div className="cart">
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="items-list">
          <div className="item-1">
            <img src="photos/bananas.png" alt="item-1" />
            <div className="item-1-list">
              <h5>Banana</h5>
              <h6>Rs.100</h6>
              <div className="cart">
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export { ItemsProducts };
