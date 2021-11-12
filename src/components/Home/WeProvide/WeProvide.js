import React from "react";
import "./WeProvide.css";
const WeProvide = () => {
  return (
    <div className="bg-white">
      <div className="container">
        <div class="row review-count text-capitalize text-md-start py-5">
          <div class="col-12 col-md-6 col-lg-3 text-center">
            <h1 class="count">2536</h1>
            <p>happy clients</p>
          </div>
          <div class="col-12 col-md-6 col-lg-3 text-center">
            <h1 class="count">2013</h1>
            <p>Models</p>
          </div>
          <div class="col-12 col-md-6 col-lg-3 text-center">
            <h1 class="count">10536</h1>
            <p>Purchases</p>
          </div>
          <div class="col-12 col-md-6 col-lg-3 text-center">
            <h1 class="count">7562</h1>
            <p>Deliveries</p>
          </div>
        </div>
        <div className="pb-5">
          <div>
            <h2 className="mt-3 section-heading">We Provide</h2>
            <div className="heading-underline"></div>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="feature">
                <i class="far fa-clock fa-3x"></i>
                <h3>Quality Watches</h3>
                <p>Find what is best suited for you </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <i className="fas fa-car fa-3x"></i>
                <h3>Fast Delivery</h3>
                <p>We'll deliver to yor doorstep</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <i class="fas fa-receipt fa-3x"></i>
                <h3>Secured Transactions</h3>
                <p>Your transaction history is safe with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeProvide;
