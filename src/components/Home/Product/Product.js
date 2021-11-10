import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product }) => {
  const { _id, name, price, shortDesc, img } = product;

  return (
    <div className="product pb-3">
      <div className="product-img">
        <img src={img} alt="" />
        <h5 className="product-price">${price}</h5>
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p>{shortDesc}</p>
      </div>
      <div>
        <Link to={`/place-order/${_id}`}>
          <button className="btn default-btn order-btn">buy now</button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
