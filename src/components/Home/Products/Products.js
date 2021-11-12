import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Product from "../Product/Product";
import "./Products.css";

const Products = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://still-woodland-16821.herokuapp.com/products", {
      headers: {
        items: "6",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
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
      <div className="container">
        <h2 className="pt-5 section-heading">Popular Products</h2>
        <div className="heading-underline"></div>
        <div className="service-container">
          {packages.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
        <NavLink as={Link} to="/shop">
          <button className="btn default-btn">All Products</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Products;
