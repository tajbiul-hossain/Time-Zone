import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ManageProducts.css";

function RemovalDialogModal(props) {
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
        <p>Are you sure you want to remove this product?</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn default-btn cancel-btn me-3"
          onClick={props.onHide}
        >
          Cancel
        </button>
        <button
          className="btn default-btn confirm-btn"
          onClick={props.onConfirm}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function RemovalConfirmationModal(props) {
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
        <p>Product successfully removed</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [removalDialogModalShow, setRemovalDialogModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetch("https://still-woodland-16821.herokuapp.com/products", {
      headers: {
        items: "0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const showModal = (id) => {
    setProductId(id);
    setRemovalDialogModalShow(true);
  };

  //Delete Booking
  const handleDeleteBooking = (id) => {
    const url = `https://still-woodland-16821.herokuapp.com/product/${id}`;
    fetch(url, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setConfirmModalShow(true);
          const remainingproducts = products.filter(
            (booking) => booking._id !== id
          );
          setProducts(remainingproducts);
        }
      });
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
    <div className="container manage-products">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Manage products</h2>
      </div>
      <div className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 991 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="start">Id</TableCell>
                <TableCell align="start">Product Name</TableCell>
                <TableCell align="start">Description</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.shortDesc}</TableCell>
                  <TableCell align="center">${product.price}</TableCell>

                  <TableCell align="center">
                    <button
                      className="btn default-btn cancel-btn"
                      onClick={() => showModal(product._id)}
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <RemovalDialogModal
        show={removalDialogModalShow}
        onHide={() => setRemovalDialogModalShow(false)}
        onConfirm={() => {
          setRemovalDialogModalShow(false);
          handleDeleteBooking(productId);
        }}
        backdrop="static"
        keyboard={false}
      />
      <RemovalConfirmationModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default ManageProducts;
