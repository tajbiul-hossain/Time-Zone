import React from "react";
import { Row } from "react-bootstrap";
import Trip from "../Trip/Trip";

const LatestNews = () => {
  return (
    <div id="news" className="container pt-4">
      <h2 className="mt-5  section-heading">Recent Trips</h2>
      <div className="heading-underline"></div>
      <div className="news-container">
        <Row xs={1} md={2} lg={3} className="g-4">
          <Trip
            name="Journeys Are Best Measured In New Friends"
            date="June 03, 2021"
            img="https://i.ibb.co/CzpQq60/trip1.webp"
          />
          <Trip
            name="Journeys Are Best Measured In New Friends"
            date="Sept 12, 2021"
            img="https://i.ibb.co/KsBFvM8/trip2.webp"
          />
          <Trip
            name="Journeys Are Best Measured In New Friends"
            date="Oct 20, 2021"
            img="https://i.ibb.co/dtdqfZf/trip3.webp"
          />
        </Row>
      </div>
    </div>
  );
};

export default LatestNews;
