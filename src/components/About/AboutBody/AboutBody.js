import React from "react";
const AboutBody = () => {
  return (
    <div>
      <div className="section-banner-head">
        <h2 className="section-banner-title">About</h2>
      </div>
      <div className="container text-start">
        <h1 className="py-5 fw-normal">Our Story</h1>
        <div className="w-75 mx-auto">
          <p style={{ color: "#7a838b", textAlign: "justify" }}>
            “Travel is the main thing you purchase that makes you more
            extravagant”. We, at ‘Travelo’, swear by this and put stock in
            satisfying travel dreams that make you perpetually rich constantly.
            <br />
            <br />
            We have been moving excellent encounters for a considerable length
            of time through our cutting-edge planned occasion bundles and other
            fundamental travel administrations. We rouse our clients to carry on
            with a rich life, brimming with extraordinary travel encounters.
            <br />
            <br />
            Through our exceptionally curated occasion bundles, we need to take
            you on an adventure where you personally enjoy the stunning
            magnificence of America and far-off terrains. We need you to observe
            sensational scenes that are a long way past your creative ability.
            <br />
            <br />
            The powerful inclination of American voyagers to travel more
            nowadays is something that keeps us inspired to satisfy our vacation
            necessities. Our vision to give you a consistent occasion encounter
            makes us one of the main visit administrators in the regularly
            extending travel industry.
          </p>
          <div className="row my-5">
            <div className="col-12 col-md-6 pe-md-0">
              <div className="row">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/4st9jhH/about1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/Symm3kj/about3.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ps-md-0">
              <img
                className="img-fluid h-100"
                src="https://i.ibb.co/mNdmWQr/about2.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBody;
