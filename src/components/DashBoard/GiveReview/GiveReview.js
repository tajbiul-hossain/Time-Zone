import React, { useState, useRef } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import "./GiveReview.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thank you for your valuable review.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const GiveReview = () => {
  const [modalShow, setModalShow] = useState(false);
  const { user } = useAuth();

  const reviewRef = useRef();
  const starsRef = useRef();

  const handleConfirmReview = (e) => {
    const name = user.displayName;
    const email = user.email;
    const img = user.photoURL;
    const review = reviewRef.current.value;
    const stars = parseInt(starsRef.current.value);

    const newReview = {
      name,
      email,
      img,
      stars,
      review,
    };

    fetch("http://localhost:5000/placereview", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          setModalShow(true);
        }
      });

    e.preventDefault();
  };

  return (
    <div className="review-section">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Give a Review</h2>
      </div>
      <div className="container form">
        <Form className="" onSubmit={handleConfirmReview}>
          <div>
            <Row className="g-2">
              <Col className="d-flex justify-content-center col-12">
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    readOnly
                    defaultValue={user.displayName}
                  />
                  <label htmlFor="floatingInputCustom">Name</label>
                </Form.Floating>
              </Col>
              <Col className="d-flex justify-content-center col-12">
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    ref={reviewRef}
                  />
                  <label htmlFor="floatingInputCustom">
                    Share Your Thoughts
                  </label>
                </Form.Floating>
              </Col>
              <Col className="d-flex justify-content-center col-12">
                <Form.Floating className="mb-3">
                  <Form.Select
                    aria-label="Floating label select example"
                    id="floatingInputCustom"
                    type="text"
                    ref={starsRef}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Select>
                  <label htmlFor="floatingInputCustom">Rating(s)</label>
                </Form.Floating>
              </Col>
            </Row>

            <button className="btn default-btn mt-3" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default GiveReview;
