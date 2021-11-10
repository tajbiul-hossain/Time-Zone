import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 text-start">
            <h4 className="name">
              Time <span style={{ color: "#ff2020" }}>Zone</span>
            </h4>
            <ul className="footer-list">
              <li style={{ fontWeight: "300" }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                28 Runkin Street, Chittagong, 1123 Bangladesh
              </li>
              <li style={{ fontWeight: "300" }}>
                <FontAwesomeIcon icon={faPhoneAlt} />
                +88 01114-225122
              </li>
              <li style={{ fontWeight: "300" }}>
                <FontAwesomeIcon icon={faEnvelope} />
                info.timezone@gmail.com
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 text-start opening">
            <h5 className="mb-4">Opening Hours</h5>
            <div>
              <div
                className="d-flex justify-content-between"
                style={{ fontWeight: "300" }}
              >
                <p>Mon-Thu</p>
                <p>8.00-18.00</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ fontWeight: "300" }}
              >
                <p>Fri-Sat</p>
                <p>9.00-17.00</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ fontWeight: "300" }}
              >
                <p>Sun & Holiday</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
          <div className="social col-12 col-md-3 text-start ps-md-4">
            <h6 className="text-capitalize">follow us</h6>
            <p>let us be social</p>
            <div className="social-icons d-flex align-items-center justify-content-start mb-4">
              <NavLink className="icon" to="/">
                <i className="fab fa-facebook-f"></i>
              </NavLink>
              <NavLink className="icon" to="/">
                <i className="fab fa-twitter"></i>
              </NavLink>
              <NavLink className="icon" to="/">
                <i className="fab fa-dribbble"></i>
              </NavLink>
              <NavLink className="icon" to="/">
                <i className="fab fa-behance"></i>
              </NavLink>
            </div>
          </div>
          <div className="footer-line"></div>
          <p className="mt-4">&copy; Time Zone || Time Is Everything</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
