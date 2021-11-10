import { React, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Register.css";
const Register = () => {
  const {
    redirectURL,
    signInUsingGoogle,
    signUpWithEmailAndPassword,
    setUserName,
  } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const handleGoogleSignUp = () => {
    signInUsingGoogle()
      .then((result) => {
        history.push(redirectURL);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();

    setError("");
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      return;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    setPasswordError("");

    signUpWithEmailAndPassword(email, password)
      .then((result) => {
        setError("");
        setUserName(name, history, redirectURL);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="py-3 form-card">
        <h2 className="section-heading">Register</h2>
        <div className="heading-underline"></div>
        <div>
          <Form
            className="d-flex justify-content-center"
            onSubmit={handleEmailSignUp}
          >
            <div className="auth-form">
              <Form.Group className="mb-3 text-start" controlId="formBasicName">
                <Form.Label className="input-label">Name</Form.Label>
                <Form.Control
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </Form.Group>

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
                <p className="text-danger">{emailError}</p>
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
                <p className="text-danger">{passwordError}</p>
              </Form.Group>
              <p className="text-danger">{error}</p>
              <button className="btn default-btn auth-btn" type="submit">
                Sign Up
              </button>
              <p className="mt-3">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#00aeff" }}>
                  Sign In
                </Link>
              </p>
              <h5>or</h5>
              <p className="mb-2">Sign up with</p>
              <button
                className="btn default-btn google-btn"
                type="button"
                onClick={handleGoogleSignUp}
              >
                Google
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
