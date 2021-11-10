import React from "react";
import "./Notfound.css";

const Notfound = () => {
  return (
    <div className="error-page d-flex justify-content-center align-items-center">
      <div>
        <h1 className="error-code">404</h1>
        <h4>Oops, we still haven't found what you're looking for</h4>
        <p>
          The page you are looking for might have been removed, had it's name
          changed or is temporary unavailable.
        </p>
      </div>
    </div>
  );
};

export default Notfound;
