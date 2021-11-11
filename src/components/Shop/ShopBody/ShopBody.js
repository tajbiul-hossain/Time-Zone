import React, { useEffect, useState } from "react";
import Product from "../../Home/Product/Product";
import "./ShopBody.css";

const ShopBody = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: {
        items: "0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    );

  return (
    <div className="products-section pb-5">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Watch Shop</h2>
      </div>
      <div className="container pt-5">
        <div className="service-container">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopBody;
