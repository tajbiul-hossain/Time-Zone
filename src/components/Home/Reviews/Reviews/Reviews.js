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
    fetch("https://still-woodland-16821.herokuapp.com/reviews")
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
    <div className="py-5">
      <div>
        <h2 className="section-heading text-white">Customer Reviews</h2>
        <div className="heading-underline"></div>
      </div>
      <Carousel className="container pb-5">
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
