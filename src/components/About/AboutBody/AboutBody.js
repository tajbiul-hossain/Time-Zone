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
            Time Zone is one of the oldest and most reputable mechanical
            watchmakers that exists today, specializing in the production of
            handmade limited edition timepieces. All watches are limited in
            production to 100 pieces and exclusively sold on this website. To
            view the collections in person, please visit our showroom.
            <br />
            <br />
            ‍Time Zone (TZ) was established in 1998 with the dream of starting a
            watch company. While initially built on the custom production of
            gold bespoke timepieces, TZ has established three signature
            collections (Masterpiece, Limited, Mission) over the past two
            decades that remain freshly updated year by year. This historic
            company is now entering a new phase, as our young and passionate
            president, intends to scale the awareness of what pure American
            watchmaking has to offer.
            <br />
            <br />
            Join us in the rejuvenation of one of America's oldest crafts.
          </p>
          <div className="row my-5">
            <div className="col-12 col-md-6 pe-md-0">
              <div className="row">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/jHJFypT/about4.webp"
                    alt=""
                  />
                </div>
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/4YNvvSq/about1.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ps-md-0">
              <div className="row">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/LSfVTDF/about2.webp"
                    alt=""
                  />
                </div>
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.ibb.co/W0ZYKvc/about3.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBody;
