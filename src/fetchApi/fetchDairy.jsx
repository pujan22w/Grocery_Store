import React, { useState, useEffect } from "react";
import axios from "../lib/axios.js";
function FetchDairy({ onFetch }) {
  const [data, setData] = useState([]);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await axios.get(
          "http://localhost:8000/api/v1/product/filter?category=Dairy"
        );
        let products = reponse?.data?.data.products || [];
        const shuffledProducts = shuffleArray(products);
        setData(shuffledProducts);
        onFetch(shuffledProducts);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };
    fetchData();
  }, []);
  return null;
}

export default FetchDairy;
