import React from "react";
import { useLocation } from "react-router-dom";
import "./Order.css";

const Order = (props) => {
  const location = useLocation();

  const {
    _id,
    userName,
    userEmail,
    phone,
    adult,
    child,
    room,
    journeyDate,
    returnDate,
    packageName,
    price,
    img,
    status,
  } = props.booking;

  return (
    <div className="single-booking">
      <div className="service package m-0">
        <div className="service-img">
          <img src={img} alt="" />
          <h5 className="service-price">${price}</h5>
        </div>
        <div className="service_info px-3 py-2">
          <div className="d-flex justify-content-between mt-3">
            <h3>{packageName}</h3>
            <div className="days d-flex justify-content-center align-items-center">
              <i className="fa fa-clock-o"></i>
              <p className="ms-1 m-0">4 Nights / 5 Days</p>
            </div>
          </div>
          <h5
            className={
              status === "Confirmed"
                ? "text-start py-2 confirmed"
                : "text-start py-2"
            }
          >
            {status}
          </h5>
        </div>
      </div>
      <div className="booking-info text-start px-3 pb-3">
        <h6>Booking Details</h6>
        <p className="m-0 mb-1">Name: {userName}</p>
        <p className="m-0 mb-1">Email: {userEmail}</p>
        <p className="m-0 mb-1">Phone: {phone}</p>
        <p className="m-0 mb-1">Adult(s): {adult}</p>
        <p className="m-0 mb-1">Child(s): {child}</p>
        <p className="m-0 mb-1">Room(s): {room}</p>
        <p className="m-0 mb-1">Journey Date: {journeyDate}</p>
        <p className="m-0 mb-1">Return Date: {returnDate}</p>
        <h5 className="m-0 mt-4">
          Total Cost:{" "}
          <span style={{ color: "#1ec6b6" }}>
            ${parseInt(price) * (parseInt(adult) + parseInt(child))}
          </span>
        </h5>
        <div className="pt-3 d-flex justify-content-center">
          {location.pathname === "/manage-orders" && status === "Pending" && (
            <button
              onClick={() => props.handleUpdateStatus(_id)}
              className="btn default-btn update-btn me-5"
            >
              update status
            </button>
          )}
          <button
            onClick={() => props.showModal(_id)}
            className="btn default-btn cancel-btn"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
