/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../app.css";
import { MdClose } from "react-icons/md";

const Formtable = ({ handlesubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addcontainer">
      <form onSubmit={handlesubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="name">Father:</label>
        <input
          type="text"
          id="father"
          name="father"
          onChange={handleOnChange}
          value={rest.father}
        />

        <label htmlFor="name">Class:</label>
        <input
          type="text"
          id="class"
          name="class"
          onChange={handleOnChange}
          value={rest.class}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile:</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />

<label htmlFor="mobile">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={handleOnChange}
          value={rest.address}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
