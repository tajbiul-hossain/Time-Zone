import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ManageOrders.css";

function CancelationDialogModal(props) {
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
        <p>Are you sure you want to cancel this order?</p>
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

function CancelConfirmationModal(props) {
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
        <p>Order cancelation successfull</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}
function UpdateConfirmationModal(props) {
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
        <p>Order status updated.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [CancelationDialogModalShow, setCancelationDialogModalShow] =
    useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");

  const { user, token } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const uri = `https://still-woodland-16821.herokuapp.com/manageorders?email=${user.email}`;
    fetch(uri, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [user.email, token, history]);

  const showModal = (id) => {
    setOrderId(id);
    setCancelationDialogModalShow(true);
  };

  //Delete Booking
  const handleDeleteBooking = (id) => {
    const url = `https://still-woodland-16821.herokuapp.com/order/${id}`;
    fetch(url, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setConfirmModalShow(true);
          const remainingOrders = orders.filter(
            (booking) => booking._id !== id
          );
          setOrders(remainingOrders);
        }
      });
  };

  //update booking status
  const handleUpdateStatus = (id) => {
    const order = orders.filter((order) => order._id === id);
    const updatedOrder = order[0];
    updatedOrder.status = "Shipped";
    const url = `https://still-woodland-16821.herokuapp.com/manageorders/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setUpdateModalShow(true);
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
    <div className="container manage-orders">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Manage Orders</h2>
      </div>
      {orders.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <h3>There's no order from anyone!</h3>
        </div>
      )}
      {orders.length > 0 && (
        <div className="mt-3">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="start">Customer Details</TableCell>
                  <TableCell align="start">Product Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Cancel Order</TableCell>
                  <TableCell align="center">Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Name: {order.userName}
                      <br />
                      Email: {order.userEmail}
                      <br />
                      Phone: {order.phone}
                      <br />
                      Address: {order.address}
                    </TableCell>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell align="center">${order.price}</TableCell>
                    <TableCell align="center">{order.quantity}</TableCell>
                    <TableCell align="center">
                      ${parseInt(order.price) * parseInt(order.quantity)}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={order.status === "Pending" ? "red" : "green"}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className={
                          order.status === "Pending"
                            ? "btn default-btn cancel-btn"
                            : "btn default-btn cancel-btn disabled"
                        }
                        onClick={() => showModal(order._id)}
                      >
                        Cancel
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className={
                          order.status === "Pending"
                            ? "btn default-btn confirm-btn"
                            : "btn default-btn confirm-btn disabled"
                        }
                        onClick={() => handleUpdateStatus(order._id)}
                      >
                        Deliver
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <CancelationDialogModal
        show={CancelationDialogModalShow}
        onHide={() => setCancelationDialogModalShow(false)}
        onConfirm={() => {
          setCancelationDialogModalShow(false);
          handleDeleteBooking(orderId);
        }}
        backdrop="static"
        keyboard={false}
      />
      <CancelConfirmationModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
      <UpdateConfirmationModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default ManageOrders;
