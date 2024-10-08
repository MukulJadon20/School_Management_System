/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseUrl } from "./urls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handlesubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/login`, { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") { // Adjusted to match server response
          navigate('/dashboard');
        } else {
          console.error("Login failed:", result.data);
          // Optionally handle other cases, such as showing an error message
        }
      })
      .catch(err => {
        console.error("An error occurred:", err);
        // Optionally handle errors, such as showing an error message
      });
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 borde loginForm">
        <h2>Login Page</h2>
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
          <button className="btn btn-success w-100 rounded-0">Log in</button>
          <div className="mb-3">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">
              You are agree with terms & condition
            </label>
          </div>
        </form>
        <Link to="/" className="btn btn-success w-100 rounded-0">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
 