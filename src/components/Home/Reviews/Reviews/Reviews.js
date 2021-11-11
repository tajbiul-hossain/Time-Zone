import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import ReviewGroup from "../ReviewGroup/ReviewGroup";
// import ReviewGroup from "../ReviewGroup/ReviewGroup";
import "./Reviews.css";
const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [carouselItemCount, setCarouselItemCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const size = 3;
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
        const count = data.count;
        const numberOfItems = Math.ceil(count / size);
        setCarouselItemCount(numberOfItems);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h2 className="mt-5 section-heading">Customer Reviews</h2>
        <div className="heading-underline"></div>
      </div>
      <Carousel className="container py-5">
        {[...Array(carouselItemCount).keys()].map((i) => (
          <Carousel.Item key={i} interval={3000}>
            <ReviewGroup
              key={i}
              carouselNumber={i}
              size={size}
              reviews={reviews}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
