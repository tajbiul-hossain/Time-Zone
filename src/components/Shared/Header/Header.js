import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <Navbar variant="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink
              as={Link}
              to="/"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Time <span style={{ color: "#ff2020" }}>Zone</span>
            </NavLink>
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
                <Nav.Link as={Link} to="/dashboard">
                  <span>Dashboard</span>
                </Nav.Link>
                <button
                  onClick={() => logOut(history)}
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
