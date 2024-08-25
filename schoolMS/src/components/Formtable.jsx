/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const Formtable = ({ handlesubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="formcontainer">
      <form className="mt-4" onSubmit={handlesubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <h3>Enroll New Student</h3>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="name">Student Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleOnChange}
              value={rest.name}
            />

            <label htmlFor="father">Father's Name:</label>
            <input
              type="text"
              id="father"
              name="father"
              onChange={handleOnChange}
              value={rest.father}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age">Date of Birth:</label>
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
          </div>

          <div className="mb-3">
            <label htmlFor="aadhar">Addhar:</label>
            <input
              type="number"
              id="aadhar"
              name="aadhar"
              onChange={handleOnChange}
              value={rest.aadhar}
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleOnChange}
              value={rest.address}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address">Pincode:</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              onChange={handleOnChange}
              value={rest.pincode}
            />

            <label htmlFor="addmission">Addmission Date:</label>
            <input
              type="date"
              id="addmission"
              name="addmission"
              onChange={handleOnChange}
              value={rest.addmission}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addmission">Roll No. : </label>
            <input
              type="roll"
              id="roll"
              name="roll"
              onChange={handleOnChange}
              value={rest.roll}
            />

            <label htmlFor="gender">Gender : </label>
            <select
              name="gender"
              id="gender"
              onChange={handleOnChange}
              value={rest.gender}
            >
              <option value="other">other</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;

// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React from "react";
// import "../app.css";
// import { MdClose } from "react-icons/md";

// const Formtable = ({ handlesubmit, handleOnChange, handleclose, rest }) => {
//   return (
//     <div className="addcontainer">
//       <form onSubmit={handlesubmit}>
//         <div className="close-btn" onClick={handleclose}>
//           <MdClose />
//         </div>
//         <h3>Enroll New Student</h3>
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

//         <label htmlFor="age">DOB:</label>
//         <input
//           type="date"
//           id="age"
//           name="age"
//           onChange={handleOnChange}
//           value={rest.age}
//         />

//         <label htmlFor="class">Class:</label>
//         <input
//           type="text"
//           id="class"
//           name="class"
//           onChange={handleOnChange}
//           value={rest.class}
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="text"
//           id="email"
//           name="email"
//           onChange={handleOnChange}
//           value={rest.email}
//         />

//         <label htmlFor="mobile">Mobile:</label>
//         <input
//           type="number"
//           id="mobile"
//           name="mobile"
//           onChange={handleOnChange}
//           value={rest.mobile}
//         />

//         <label htmlFor="aadhar">Addhar:</label>
//         <input
//           type="number"
//           id="aadhar"
//           name="aadhar"
//           onChange={handleOnChange}
//           value={rest.aadhar}
//         />

//         <label htmlFor="address">Address:</label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           onChange={handleOnChange}
//           value={rest.address}
//         />

//         <button className="btn">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Formtable;
