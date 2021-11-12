import React, { useState, useRef } from "react";
import { Form, Modal } from "react-bootstrap";
import "./AddNewProduct.css";
function ConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Successfully added this product.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const AddNewProduct = () => {
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const NameRef = useRef();
  const DescRef = useRef();
  const PriceRef = useRef();
  const ImgRef = useRef();

  const addNewProduct = (e) => {
    const name = NameRef.current.value;
    const shortDesc = DescRef.current.value;
    const img = ImgRef.current.value;
    const price = PriceRef.current.value;

    const newProduct = { name, shortDesc, img, price };

    fetch("https://still-woodland-16821.herokuapp.com/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setConfirmationModalShow(true);
          e.target.reset();
        }
      });
    e.preventDefault();
  };

  return (
    <div className="container add-product">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Add Product</h2>
      </div>
      <div className="py-3">
        <Form
          className="d-flex justify-content-center"
          onSubmit={addNewProduct}
        >
          <div>
            <Form.Group className="mb-3 text-start" controlId="formBasicName">
              <Form.Label className="input-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                ref={NameRef}
                placeholder="Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label className="input-label">
                Product Description
              </Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                placeholder="Description"
                ref={DescRef}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 text-start"
              controlId="formBasicPassword"
            >
              <Form.Label className="input-label">Price</Form.Label>
              <Form.Control
                type="text"
                ref={PriceRef}
                placeholder="$"
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 text-start"
              controlId="formBasicPassword"
            >
              <Form.Label className="input-label">Image URL</Form.Label>
              <Form.Control
                type="text"
                ref={ImgRef}
                placeholder="https://"
                required
              />
            </Form.Group>
            <button className="btn default-btn" type="submit">
              Add Product
            </button>
          </div>
        </Form>
      </div>
      <ConfirmationModal
        show={confirmationModalShow}
        onHide={() => setConfirmationModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default AddNewProduct;
