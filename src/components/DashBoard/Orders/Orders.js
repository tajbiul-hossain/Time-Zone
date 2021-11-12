import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Orders.css";

function DialogModal(props) {
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [dialogModalShow, setDialogModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const { user, token } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const uri = `https://still-woodland-16821.herokuapp.com/userorders?email=${user.email}`;
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
    setDialogModalShow(true);
  };

  //Delete Booking
  const handleDeleteOrder = (id) => {
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

  if (loading)
    return (
      <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
      </div>
    );

  return (
    <div className="container my-orders">
      <div className="section-banner-head">
        <h2 className="section-banner-title">My Orders</h2>
      </div>
      {orders.length === 0 && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <h3>You haven't ordered anything yet!</h3>
        </div>
      )}
      {orders.length > 0 && (
        <div className="mt-3">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Cancel Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.productName}
                    </TableCell>
                    <TableCell align="right">${order.price}</TableCell>
                    <TableCell align="right">{order.quantity}</TableCell>
                    <TableCell align="right">
                      ${parseInt(order.price) * parseInt(order.quantity)}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={order.status === "Pending" ? "red" : "green"}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell align="right">
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <DialogModal
        show={dialogModalShow}
        onHide={() => setDialogModalShow(false)}
        onConfirm={() => {
          setDialogModalShow(false);
          handleDeleteOrder(orderId);
        }}
        backdrop="static"
        keyboard={false}
      />
      <ConfirmationModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default Orders;
