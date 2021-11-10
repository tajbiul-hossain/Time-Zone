import React, { useState, useRef } from "react";
import { Form, Modal } from "react-bootstrap";

function ConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Success Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Successfully added this package.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const AddNewProductBody = () => {
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const packageNameRef = useRef();
  const packageDescRef = useRef();
  const packagePriceRef = useRef();
  const packageIncRef = useRef();
  const packageExcRef = useRef();
  const packageImgRef = useRef();

  const addNewProduct = (e) => {
    const name = packageNameRef.current.value;
    const shortDesc = packageDescRef.current.value;
    const img = packageImgRef.current.value;
    const price = packagePriceRef.current.value;
    const exc = packageExcRef.current.value;
    const inc = packageIncRef.current.value;

    const newPackage = { name, shortDesc, img, price, exc, inc };

    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPackage),
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
    <div className="container">
      <div className="py-3">
        <h2 className=" section-heading">Add New Product</h2>
        <div className="heading-underline"></div>
        <div>
          <Form
            className="d-flex justify-content-center"
            onSubmit={addNewProduct}
          >
            <div>
              <Form.Group className="mb-3 text-start" controlId="formBasicName">
                <Form.Label className="input-label">Package Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={packageNameRef}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label className="input-label">
                  Package Description
                </Form.Label>
                <Form.Control
                  type="texr"
                  ref={packageDescRef}
                  placeholder="Enter Description"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPassword"
              >
                <Form.Label className="input-label">
                  Package Price / P
                </Form.Label>
                <Form.Control
                  type="text"
                  ref={packagePriceRef}
                  placeholder="Enter Price"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPassword"
              >
                <Form.Label className="input-label">
                  What This Package Includes?
                </Form.Label>
                <Form.Control
                  type="text"
                  ref={packageIncRef}
                  placeholder="Package Includes"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPassword"
              >
                <Form.Label className="input-label">
                  What This Package Excludes?
                </Form.Label>
                <Form.Control
                  type="text"
                  ref={packageExcRef}
                  placeholder="Package Excludes"
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
                  ref={packageImgRef}
                  placeholder="Enter URL"
                  required
                />
              </Form.Group>
              <button className="btn default-btn" type="submit">
                Add Package
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
    </div>
  );
};

export default AddNewProductBody;
