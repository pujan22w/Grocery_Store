import React, { useState, useEffect } from "react";
function FetchFruits() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const reponse = await fetch(
      "http://localhost:8000/api/v1/product/filter?category=Fruits"
    );
    const data = await reponse.json();
    setData(data?.data?.products || []);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.map((e) => (
        <>
          <div className="products-item">
            <img src={e.productImage} alt={e.productname} />
            <h4>{e.productname}</h4>
            <p>Rs.{e.price}</p>
            <button>Add to Cart</button>
          </div>
        </>
      ))}
    </>
  );
}
export default FetchFruits;
