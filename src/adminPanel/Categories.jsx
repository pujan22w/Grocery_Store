// src/components/Categories.js
import React, { useState, useEffect } from "react";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved
      ? JSON.parse(saved)
      : ["Fruits", "Vegetables", "Dairy", "Bakery"];
  });
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const deleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category}"?`)) {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="add-category">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li key={index}>
            {category}
            <button
              className="delete-btn"
              onClick={() => deleteCategory(category)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
