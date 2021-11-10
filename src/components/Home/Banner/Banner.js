import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="home-banner d-flex align-items-center">
      <div className="container">
        <h1 className="banner-title text-capitalize">
          select your new perfect style
        </h1>
        <NavLink as={Link} to="/shop">
          <button className="btn default-btn">Shop Now</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Banner;
