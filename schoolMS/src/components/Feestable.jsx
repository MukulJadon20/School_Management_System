/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../app.css";
import { MdClose } from "react-icons/md";

const Feestable = ({ handlesubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="formcontainer">
      <form className="mt-4" onSubmit={handlesubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <h3>Update Fee</h3>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleOnChange}
              value={rest.name}
            />

            <label htmlFor="father">Father:</label>
            <input
              type="text"
              id="father"
              name="father"
              onChange={handleOnChange}
              value={rest.father}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age">DOB:</label>
            <input
              type="date"
              id="age"
              name="age"
              onChange={handleOnChange}
              value={rest.age}
            />

            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              name="class"
              onChange={handleOnChange}
              value={rest.class}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="class">Total Fee:</label>
            <input
              type="text"
              id="fees"
              name="fees"
              onChange={handleOnChange}
              value={rest.fees}
            />

            <label htmlFor="class">Due Fee:</label>
            <input
              type="text"
              id="due"
              name="due"
              onChange={handleOnChange}
              value={rest.due}
            />
          </div>

          <label htmlFor="aadhar">Payment Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleOnChange}
            value={rest.date}
          />
          <div className="mb-3">
            <label
              htmlFor="mode"
              id="mode"
              name="mode"
              onChange={handleOnChange}
              value={rest.address}
            >
              Payment Mode:
            </label>
            <select name="mode" id="mode">
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="online">Online</option>
            </select>
            {/* <input
              type="text"
              id="mode"
              name="mode"
              onChange={handleOnChange}
              value={rest.address}
            /> */}
          </div>
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>

    //     <div className="addcontainer">
    //       <form onSubmit={handlesubmit}>
    //         <div className="close-btn" onClick={handleclose}>
    //           <MdClose />
    //         </div>
    //         <h3>Update Fess</h3>
    //         <label htmlFor="name">Name:</label>
    //         <input
    //           type="text"
    //           id="name"
    //           name="name"
    //           onChange={handleOnChange}
    //           value={rest.name}
    //         />

    //         <label htmlFor="father">Father:</label>
    //         <input
    //           type="text"
    //           id="father"
    //           name="father"
    //           onChange={handleOnChange}
    //           value={rest.father}
    //         />

    // <label htmlFor="age">DOB:</label>
    // <input
    //   type="date"
    //   id="age"
    //   name="age"
    //   onChange={handleOnChange}
    //   value={rest.age}
    // />

    // <label htmlFor="class">Class:</label>
    // <input
    //   type="text"
    //   id="class"
    //   name="class"
    //   onChange={handleOnChange}
    //   value={rest.class}
    // />

    // <label htmlFor="class">Total Fee:</label>
    //         <input
    //           type="text"
    //           id="fees"
    //           name="fees"
    //           onChange={handleOnChange}
    //           value={rest.fees}
    //         />

    // <label htmlFor="class">Due Fee:</label>
    //         <input
    //           type="text"
    //           id="due"
    //           name="due"
    //           onChange={handleOnChange}
    //           value={rest.due}
    //         />

    //         <button className="btn">Submit</button>
    //       </form>
    //     </div>
  );
};

export default Feestable;
