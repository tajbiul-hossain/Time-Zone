import React from "react";
import { Col } from "react-bootstrap";
import "./Trip.css";
const Trip = (props) => {
  return (
    <Col>
      <div className="trip">
        <div className="trip-img">
          <img src={props.img} alt="" />
        </div>
        <div className="trip-info">
          <div className="trip-date">
            <span>{props.date}</span>
          </div>
          <h3>{props.name}</h3>
        </div>
      </div>
    </Col>
  );
};

export default Trip;
