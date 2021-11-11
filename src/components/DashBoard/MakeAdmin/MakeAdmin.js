import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./MakeAdmin.css";
import useAuth from "../../../hooks/useAuth";

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
        <p>User promoted to admin</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn default-btn confirm-btn" onClick={props.onHide}>
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const uri = "http://localhost:5000/users";
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, [users]);

  //update user role
  const handlePromoteUser = (email) => {
    const user = { email };
    const url = "http://localhost:5000/users/admin";
    fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
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
    <div className="container make-admin">
      <div className="section-banner-head">
        <h2 className="section-banner-title">Make Admin</h2>
      </div>
      <div className="mt-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 991 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="start">User Name</TableCell>
                <TableCell align="start">User Email</TableCell>
                <TableCell align="start">Role</TableCell>
                <TableCell align="start">Update Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { buser: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.displayName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <button
                      className={
                        user.role === "user"
                          ? "btn default-btn confirm-btn"
                          : "btn default-btn confirm-btn d-none"
                      }
                      onClick={() => handlePromoteUser(user.email)}
                    >
                      Promote
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <UpdateConfirmationModal
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default MakeAdmin;
