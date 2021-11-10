import React from "react";
import "./ContactBody.css";

const ContactBody = () => {
  return (
    <div>
      <div className="section-banner-head">
        <h2 className="section-banner-title">Contact</h2>
      </div>
      <div className="container mt-5">
        <iframe
          title="map"
          style={{ border: "0", width: "100%", height: "350px" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.8014979007!2d90.41423635040795!3d23.718781684529322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8546417977d%3A0xe379c4c930d9fca8!2sRankin%20St%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1635639981456!5m2!1sen!2sbd"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div className="container text-start font-link">
          <div className="row mt-4">
            <div
              className="col-md-5 text-white d-flex flex-column justify-content-center p-md-5 p-3 mb-4"
              style={{ backgroundColor: "#ff4a52" }}
            >
              <div>
                <h5 className="fw-bold">Address</h5>
                <p className="fw-light">
                  36, 1 Rankin St, Dhaka 1203, Bangladesh
                </p>
              </div>
              <div>
                <h5 className="fw-bold">Phone</h5>
                <p className="fw-light">+88 01114-225122</p>
              </div>

              <div>
                <h5 className="fw-bold">Fax</h5>
                <p className="fw-light">+84.2252.2250.125</p>
              </div>
              <div>
                <h5 className="fw-bold">Email</h5>
                <p className="fw-light">info.travelo@gmail.com</p>
              </div>
            </div>
            <div className="col-md-7 p-0 ps-md-4">
              <form className="form-contact">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control w-100"
                        name="message"
                        id="message"
                        cols="30"
                        rows="9"
                        placeholder="Enter Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="subject"
                        id="subject"
                        type="text"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control valid"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control valid"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button type="button" className="btn default-btn contact-btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBody;
