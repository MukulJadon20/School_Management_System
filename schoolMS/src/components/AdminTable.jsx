 
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const AdminTable = ({ handlesubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="formcontainer">
      <form className="mt-4" onSubmit={handlesubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <h3>Edit Admin</h3>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="name">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleOnChange}
              value={rest.email}
            />

            <label htmlFor="father">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={handleOnChange}
              value={rest.password}
            />
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default AdminTable;
