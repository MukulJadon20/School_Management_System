/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/register", { email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 borde loginForm">
        <h2>Register Admin</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Signup</button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="btn btn-success w-100 rounded-0">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
