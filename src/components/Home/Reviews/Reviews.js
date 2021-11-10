import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import useAuth from "../../../hooks/useAuth";
import "./Reviews.css";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
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
    <div>
      <div>
        <h2 className="mt-5 section-heading">Customer Reviews</h2>
        <div className="heading-underline"></div>
      </div>
      <Carousel className="container py-5">
        <Carousel.Item>
          <div className="row reviews justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="review-details">
                    <p>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                      {reviews[0].review}
                      <i className="fa fa-quote-right" aria-hidden="true"></i>
                    </p>
                    <img className="img-fluid" src={reviews[0].img} alt="" />
                  </div>
                  <h3>{reviews[0].name}</h3>
                  <StarRatings
                    rating={reviews[0].stars}
                    starRatedColor="#ff2020"
                    starDimension="20px"
                    starEmptyColor="#4a4a4b"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="review-details">
                    <p>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                      Proin iaculis purus consequat sem cure digni ssim donec.
                      <i className="fa fa-quote-right" aria-hidden="true"></i>
                    </p>
                    <img className="img-fluid" src={user.photoURL} alt="" />
                  </div>
                  <h3>Saul Goodman</h3>
                  <StarRatings
                    rating={2.403}
                    starRatedColor="#ff2020"
                    starDimension="20px"
                    starEmptyColor="#4a4a4b"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="review-details">
                    <p>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                      Proin iaculis purus consequat sem cure digni ssim donec.
                      <i className="fa fa-quote-right" aria-hidden="true"></i>
                    </p>
                    <img className="img-fluid" src={user.photoURL} alt="" />
                  </div>
                  <h3>Saul Goodman</h3>
                  <StarRatings
                    rating={2.403}
                    starRatedColor="#ff2020"
                    starDimension="20px"
                    starEmptyColor="#4a4a4b"
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row reviews justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="review-details">
                    <p>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                      Proin iaculis purus consequat sem cure digni ssim donec.
                      <i className="fa fa-quote-right" aria-hidden="true"></i>
                    </p>
                    <img className="img-fluid" src={user.photoURL} alt="" />
                  </div>
                  <h3>Saul Goodman</h3>
                  <StarRatings
                    rating={2.403}
                    starRatedColor="#ff2020"
                    starDimension="20px"
                    starEmptyColor="#4a4a4b"
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Reviews;
