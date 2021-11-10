import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  return (
    <>
      <Navbar variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">
            Time <span style={{ color: "#ff2020" }}>Zone</span>
          </Navbar.Brand>
          <Navbar.Toggle>
            <i className="fas fa-ellipsis-v"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav.Link as={Link} to="/">
              <span>Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              <span>Shop</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              <span>About</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <span>Contact</span>
            </Nav.Link>
            {user?.email ? (
              <div className="d-lg-flex align-items-center">
                <li className="dropdown">
                  <Nav.Link>
                    Profile <i className="fas fa-angle-down"></i>
                  </Nav.Link>
                  <ul className="submenu p-0">
                    <div className="d-flex align-items-center justify-content-around">
                      <img className="user-image" src={user.photoURL} alt="" />
                      <h6 className="username p-0">{user.displayName}</h6>
                    </div>
                    <NavDropdown.Divider />
                    <Nav.Link as={Link} to="/my-orders" className="ps-3 pb-2">
                      <span>My Orders</span>
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/manage-orders"
                      className="ps-3 pb-2"
                    >
                      <span>Manage Orders</span>
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/add-new-product"
                      className="ps-3 pb-2"
                    >
                      <span>Add Product</span>
                    </Nav.Link>
                  </ul>
                </li>
                <button
                  onClick={logOut}
                  className="btn default-btn register-btn"
                >
                  Log out
                </button>
              </div>
            ) : location.pathname === "/register" ||
              location.pathname === "/login" ? (
              ""
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="btn default-btn register-btn"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="ms-2 btn default-btn register-btn"
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
