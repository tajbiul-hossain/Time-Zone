import React from "react";
import Review from "../Review/Review";
import "./ReviewGroup.css";
const ReviewGroup = ({ carouselNumber, reviews, size }) => {
  const start = carouselNumber * size;
  const end = start + size;
  const reviewGroup = reviews.slice(start, end);
  return (
    <div className="row reviews justify-content-center">
      {reviewGroup.map((review) => (
        <Review key={review._id} review={review}></Review>
      ))}
    </div>
  );
};

export default ReviewGroup;
