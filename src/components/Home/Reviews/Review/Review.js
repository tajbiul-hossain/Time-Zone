import React from "react";
import StarRatings from "react-star-ratings";

const Review = ({ review }) => {
  return (
    <div className="col-md-4 mb-2">
      <div className="card" style={{ height: "100%" }}>
        <div className="card-body">
          <div className="review-details">
            <p>
              <i className="fa fa-quote-left" aria-hidden="true"></i>
              {review.review}
              <i className="fa fa-quote-right" aria-hidden="true"></i>
            </p>
            <img className="img-fluid" src={review.img} alt="" />
          </div>
          <h3 className="mb-0">{review.name}</h3>
          <StarRatings
            rating={review.stars}
            starRatedColor="#ff2020"
            starDimension="20px"
            starEmptyColor="#4a4a4b"
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
