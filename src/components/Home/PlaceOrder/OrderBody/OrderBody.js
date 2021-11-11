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
        <p>
          Product is successfully added to cart. Please proceed to payment.
          Happy Shopping.
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
  const [product, setProduct] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { productId } = useParams();
  const history = useHistory();

  const { name, price, img, shortDesc } = product;
  const phoneRef = useRef();
  const addressRef = useRef();
  const quantityRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  const handleConfirmBooking = (e) => {
    const productName = name;
    const userName = user.displayName;
    const userEmail = user.email;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const quantity = quantityRef.current.value;
    const status = "Pending";
    const color = "#ff2020";

    const newBooking = {
      productName,
      userName,
      userEmail,
      phone,
      address,
      quantity,
      price,
      img,
      status,
      color,
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
    <div className="bg-white place-order">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Place Order</h2>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-6 text-start d-flex align-items-center">
            <div className="product px-5 pt-5 pb-3">
              <div className="text-center">
                <img src={img} alt="" width="60%" />
              </div>
              <div className="product-info mt-3">
                <h5 className="detailed-price mt-0">${price}</h5>
                <h3>{name}</h3>
                <p>{shortDesc}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 p-3">
            <Form className="d-flex" onSubmit={handleConfirmBooking}>
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
                        type="email"
                        readOnly
                        defaultValue={user.email}
                      />
                      <label htmlFor="floatingInputCustom">Email address</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center col-12">
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        ref={phoneRef}
                      />
                      <label htmlFor="floatingInputCustom">Phone</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center col-12">
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        ref={addressRef}
                      />
                      <label htmlFor="floatingInputCustom">Address</label>
                    </Form.Floating>
                  </Col>
                  <Col className="d-flex justify-content-center col-12">
                    <Form.Floating className="mb-3">
                      <Form.Control
                        id="floatingInputCustom"
                        type="number"
                        ref={quantityRef}
                      />
                      <label htmlFor="floatingInputCustom">Quantity</label>
                    </Form.Floating>
                  </Col>
                </Row>

                <button className="btn default-btn mt-3" type="submit">
                  Add to Cart
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
          history.push("/dashboard");
        }}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default OrderBody;
