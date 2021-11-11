import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const LoginBody = () => {
  const {
    signInUsingGoogle,
    logInWithEmailAndPassword,
    updateRedirectURL,
    saveUser,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const history = useHistory();
  const redirect_url = location.state?.from || "/home";

  updateRedirectURL(redirect_url);

  const handleGoogleSignIn = () => {
    signInUsingGoogle()
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        history.push(redirect_url);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password)
      .then((result) => {
        setError("");
        history.push(redirect_url);
      })
      .catch((error) => {
        setError("Incorrect email or password");
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-white py-5">
      <div className="container">
        <div className="form-card py-3 ">
          <h2 className=" section-heading">Log In</h2>
          <div className="heading-underline"></div>
          <div>
            <Form
              className="d-flex justify-content-center"
              onSubmit={handleEmailSignIn}
            >
              <div className="auth-form">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="input-label">Email address</Form.Label>
                  <Form.Control
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="input-label">Password</Form.Label>
                  <Form.Control
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <p className="text-danger">{error}</p>
                <button className="btn default-btn auth-btn" type="submit">
                  Sign In
                </button>
                <p className="mt-3">
                  Do not have an account?{" "}
                  <Link to="/register" style={{ color: "#00aeff" }}>
                    Sign Up
                  </Link>
                </p>
                <h5>or</h5>
                <p className="mb-2">Sign in with</p>
                <button
                  className="btn default-btn google-btn"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  Google
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
