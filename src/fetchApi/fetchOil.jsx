import React, { useState, useEffect } from "react";

function FetchOil() {
  const [data, setData] = useState([]);

  const fetchOil = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/product/filter?category=Oil"
    );
    let data = await response.json();
    console.log(response);
    console.log(data);
    setData(data?.data?.products);
  };

  useEffect(() => {
    fetchOil();
  }, []);

  return (
    <>
      {data.map((e) => (
        <div className="products-item" key={e.category}>
          <img src={e.productImage} alt={e.productname} />
          <h4>{e.productname}</h4>
          <p>Rs.{e.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </>
  );
}
export default FetchOil;
