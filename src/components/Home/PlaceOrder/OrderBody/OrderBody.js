import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import "./OrderBody.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You have successfully booked this package. We will contact you soon.
          Please be ready on the day of journey. Happy Travel.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const OrderBody = () => {
  const [service, setService] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { productId } = useParams();
  const history = useHistory();

  const { name, price, img } = service;
  const phoneRef = useRef();
  const adultRef = useRef();
  const childRef = useRef();
  const roomRef = useRef();
  const journeyRef = useRef();
  const returnRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      });
  }, [productId]);

  const handleConfirmBooking = (e) => {
    const packageName = name;
    const userName = user.displayName;
    const userEmail = user.email;
    const phone = phoneRef.current.value;
    const adult = adultRef.current.value;
    const child = childRef.current.value;
    const room = roomRef.current.value;
    const journeyDate = journeyRef.current.value;
    const returnDate = returnRef.current.value;
    const status = "Pending";

    const newBooking = {
      userName,
      userEmail,
      phone,
      adult,
      child,
      room,
      journeyDate,
      returnDate,
      packageName,
      price,
      img,
      status,
    };

    fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setModalShow(true);
          e.target.reset();
        }
      });

    e.preventDefault();
  };

  if (loading)
    return (
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    );

  return (
    <div className="single-package">
      <div className="package-head">
        <img className="package-image" src={img} alt="" />
        <h2 className="package-title">{name}</h2>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-4 text-start">
            <h2 className="detailed-price">Cost: ${price}/P</h2>
            <h6>(4 NIGHTS / 5 DAYS)</h6>
          </div>
          <div className="col-12 col-md-8 p-3">
            <Form className="d-flex" onSubmit={handleConfirmBooking}>
              <div>
                <Row className="g-2">
                  <Col className="d-flex justify-content-center" md>
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
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        readOnly
                        defaultValue={user.email}
                      />
                      <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        ref={phoneRef}
                      />
                      <label htmlFor="floatingInputCustom">Phone</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Select
                        aria-label="Floating label select example"
                        id="floatingInputCustom"
                        type="text"
                        ref={adultRef}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </Form.Select>
                      <label htmlFor="floatingInputCustom">Adult(s)</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Select
                        aria-label="Floating label select example"
                        id="floatingInputCustom"
                        type="text"
                        ref={childRef}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </Form.Select>
                      <label htmlFor="floatingInputCustom">Child(s)</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Select
                        aria-label="Floating label select example"
                        id="floatingInputCustom"
                        type="text"
                        ref={roomRef}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </Form.Select>
                      <label htmlFor="floatingInputCustom">Room(s)</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="date"
                        ref={journeyRef}
                      />
                      <label htmlFor="floatingInputCustom">Journey Date</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center" md>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="date"
                        ref={returnRef}
                      />
                      <label htmlFor="floatingInputCustom">Return Date</label>
                    </Form.Floating>
                  </Col>
                </Row>

                <button className="btn default-btn mt-3" type="submit">
                  Confirm Booking
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/my-orders");
        }}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default OrderBody;
