/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const ResultTable = ({
  handlesubmit,
  handleOnChange,
  handleclose,
  rest,
  setRest,
}) => {
  const [totalMarks, setTotalMarks] = useState(0);
  const [marks, setMarks] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [grade, setGrade] = useState(""); // New state for grade

  // Calculate total marks whenever a subject's marks change
  useEffect(() => {
    const calculateTotal = () => {
      const english = parseInt(rest.english || 0);
      const hindi = parseInt(rest.hindi || 0);
      const mathematics = parseInt(rest.mathematics || 0);
      const science = parseInt(rest.science || 0);
      const yellow = parseInt(rest.yellow || 0);

      const total = english + hindi + mathematics + science + yellow;

      const maxTotalMarks = 500; // Assuming each subject is out of 100
      setTotalMarks(total);
      const calculatedPercentage = (total / maxTotalMarks) * 100;
      setPercentage(calculatedPercentage.toFixed(2)); // Keep two decimal places

      // Determine the grade based on total marks
      let calculatedGrade = "";
      if (total >= 450) {
        calculatedGrade = "A";
      } else if (total >= 350) {
        calculatedGrade = "B";
      } else if (total >= 250) {
        calculatedGrade = "C";
      } else if (total >= 150) {
        calculatedGrade = "D";
      } else {
        calculatedGrade = "F";
      }
      setGrade(calculatedGrade); // Save grade in state
    };

    calculateTotal();
  }, [rest]);

  return (
    <div className="formcontainer">
      <form className="mt-4" onSubmit={handlesubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <h3>Update Result</h3>
        <div className="form">
          <div className="mb-3">
            <label htmlFor="roll">Roll No.:</label>
            <input
              type="text"
              id="roll"
              name="roll"
              onChange={handleOnChange}
              value={rest.roll || ""}
            />

            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleOnChange}
              value={rest.name || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="father">Father:</label>
            <input
              type="text"
              id="father"
              name="father"
              onChange={handleOnChange}
              value={rest.father || ""}
            />

            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              name="class"
              onChange={handleOnChange}
              value={rest.class || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="english">English:</label>
            <input
              type="number"
              id="english"
              name="english"
              onChange={handleOnChange}
              value={rest.english || ""}
            />

            <label htmlFor="hindi">Hindi:</label>
            <input
              type="number"
              id="hindi"
              name="hindi"
              onChange={handleOnChange}
              value={rest.hindi || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mathematics">Mathematics:</label>
            <input
              type="number"
              id="mathematics"
              name="mathematics"
              onChange={handleOnChange}
              value={rest.mathematics || ""}
            />

            <label htmlFor="science">Science:</label>
            <input
              type="number"
              id="science"
              name="science"
              onChange={handleOnChange}
              value={rest.science || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="yellow">Social Science:</label>
            <input
              type="number"
              id="yellow"
              name="yellow"
              onChange={handleOnChange}
              value={rest.yellow || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="marks">Grand Total:</label>
            <input
              type="number"
              id="total"
              name="total"
              value={totalMarks}
              readOnly
            />

            <label htmlFor="total"> Re-Grand Total:</label>
            <input
              type="number"
              id="marks"
              name="marks"
              onChange={handleOnChange}
              value={rest.marks || ""}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="percentage">Percentage:</label>
            <input
              type="text"
              id="percentage"
              name="percentage"
              value={`${percentage}`}
              readOnly
            />

            <label htmlFor="per">Percentage:</label>
            <input
              type="text"
              id="per"
              name="per"
              value={rest.per || ""}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="grade">Grade:</label>
            <input type="text" id="grade" name="grade" value={grade} readOnly />

            <label htmlFor="grade">Re-Grade:</label>
            <input type="text" id="grade" name="grade"  value={rest.grade || ""}
              onChange={handleOnChange}/>
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResultTable;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
// import "../App.css";
// import { MdClose } from "react-icons/md";

// const ResultTable = ({ handlesubmit, handleOnChange, handleclose, rest, setRest }) => {
//   return (
//     <div className="formcontainer">
//       <form className="mt-4" onSubmit={handlesubmit}>
//         <div className="close-btn" onClick={handleclose}>
//           <MdClose />
//         </div>
//         <h3>Update Result</h3>
//         <div className="form">
//           <div className="mb-3">
//             <label htmlFor="roll">Roll No.:</label>
//             <input
//               type="text"
//               id="roll"
//               name="roll"
//               onChange={handleOnChange}
//               value={rest.roll || ""}
//             />

//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               onChange={handleOnChange}
//               value={rest.name || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="father">Father:</label>
//             <input
//               type="text"
//               id="father"
//               name="father"
//               onChange={handleOnChange}
//               value={rest.father || ""}
//             />

//             <label htmlFor="class">Class:</label>
//             <input
//               type="text"
//               id="class"
//               name="class"
//               onChange={handleOnChange}
//               value={rest.class || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="english">English:</label>
//             <input
//               type="number"
//               id="english"
//               name="english"
//               onChange={handleOnChange}
//               value={rest.english || ""}
//             />

//             <label htmlFor="hindi">Hindi:</label>
//             <input
//               type="number"
//               id="hindi"
//               name="hindi"
//               onChange={handleOnChange}
//               value={rest.hindi || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="mathematics">Mathematics:</label>
//             <input
//               type="number"
//               id="mathematics"
//               name="mathematics"
//               onChange={handleOnChange}
//               value={rest.mathematics || ""}
//             />

//             <label htmlFor="science">Science:</label>
//             <input
//               type="number"
//               id="science"
//               name="science"
//               onChange={handleOnChange}
//               value={rest.science || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="yellow">Social Science:</label>
//             <input
//               type="number"
//               id="yellow"
//               name="yellow"
//               onChange={handleOnChange}
//               value={rest.yellow || ""}
//             />

//             <label htmlFor="marks">Total Marks:</label>
//             <input
//               type="text"
//               id="marks"
//               name="marks"
//               value={rest.marks || ""}
//               onChange={handleOnChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="per">Percentage:</label>
//             <input
//               type="text"
//               id="per"
//               name="per"
//               value={rest.per || ""}
//               onChange={handleOnChange}
//             />

//             <button className="btn" type="submit">Submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResultTable;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
// import "../App.css";
// import { MdClose } from "react-icons/md";

// const ResultTable = ({ handlesubmit, handleOnChange, handleclose, rest, setRest }) => {

//   useEffect(() => {
//     if (setRest) {
//       // Parse values as integers, default to 0 if NaN
//       const english = parseInt(rest.english, 10) || 0;
//       const hindi = parseInt(rest.hindi, 10) || 0;
//       const mathematics = parseInt(rest.mathematics, 10) || 0;
//       const science = parseInt(rest.science, 10) || 0;
//       const socialScience = parseInt(rest.yellow, 10) || 0;

//       // Calculate total marks
//       const totalMarks = english + hindi + mathematics + science + socialScience;

//       // Calculate percentage based on total possible marks (500)
//       const percentage = (totalMarks / 500) * 100;

//       // Update state with calculated values
//       setRest(prevState => ({
//         ...prevState,
//         marks: totalMarks.toString(), // Convert totalMarks to a string for display
//         per: percentage.toFixed(2),   // Convert percentage to a string with 2 decimal places
//       }));
//     }
//   }, [rest.english, rest.hindi, rest.mathematics, rest.science, rest.yellow, setRest]);

//   return (
//     <div className="formcontainer">
//       <form className="mt-4" onSubmit={handlesubmit}>
//         <div className="close-btn" onClick={handleclose}>
//           <MdClose />
//         </div>
//         <h3>Update Result</h3>
//         <div className="form">
//           <div className="mb-3">
//             <label htmlFor="roll">Roll No.:</label>
//             <input
//               type="text"
//               id="roll"
//               name="roll"
//               onChange={handleOnChange}
//               value={rest.roll || ""}
//             />

//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               onChange={handleOnChange}
//               value={rest.name || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="father">Father:</label>
//             <input
//               type="text"
//               id="father"
//               name="father"
//               onChange={handleOnChange}
//               value={rest.father || ""}
//             />

//             <label htmlFor="class">Class:</label>
//             <input
//               type="text"
//               id="class"
//               name="class"
//               onChange={handleOnChange}
//               value={rest.class || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="english">English:</label>
//             <input
//               type="number"
//               id="english"
//               name="english"
//               onChange={handleOnChange}
//               value={rest.english || ""}
//             />

//             <label htmlFor="hindi">Hindi:</label>
//             <input
//               type="number"
//               id="hindi"
//               name="hindi"
//               onChange={handleOnChange}
//               value={rest.hindi || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="mathematics">Mathematics:</label>
//             <input
//               type="number"
//               id="mathematics"
//               name="mathematics"
//               onChange={handleOnChange}
//               value={rest.mathematics || ""}
//             />

//             <label htmlFor="science">Science:</label>
//             <input
//               type="number"
//               id="science"
//               name="science"
//               onChange={handleOnChange}
//               value={rest.science || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="yellow">Social Science:</label>
//             <input
//               type="number"
//               id="yellow"
//               name="yellow"
//               onChange={handleOnChange}
//               value={rest.yellow || ""}
//             />

//             <label htmlFor="marks">Total Marks:</label>
//             <input
//               type="text"
//               id="marks"
//               name="marks"
//               value={rest.marks || ""}
//               readOnly
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="per">Percentage:</label>
//             <input
//               type="text"
//               id="per"
//               name="per"
//               value={rest.per || ""}
//               readOnly
//             />

//             <button className="btn" type="submit">Submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResultTable;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
// import "../App.css";
// import { MdClose } from "react-icons/md";

// const ResultTable = ({ handlesubmit, handleOnChange, handleclose, rest, setRest }) => {

//   useEffect(() => {
//     if (setRest) {
//       // Parse values as integers, default to 0 if NaN
//       const english = parseInt(rest.english, 10) || 0;
//       const hindi = parseInt(rest.hindi, 10) || 0;
//       const mathematics = parseInt(rest.mathematics, 10) || 0;
//       const science = parseInt(rest.science, 10) || 0;
//       const socialScience = parseInt(rest.yellow, 10) || 0;

//       // Calculate total marks
//       const totalMarks = english + hindi + mathematics + science + socialScience;

//       // Total possible marks is 500 (5 subjects * 100 marks each)
//       const percentage = (totalMarks / 500) * 100;

//       // Update state
//       setRest(prevState => ({
//         ...prevState,
//         marks: totalMarks,
//         per: percentage.toFixed(2), // Ensure percentage is a string with 2 decimal places
//       }));
//     }
//   }, [rest.english, rest.hindi, rest.mathematics, rest.science, rest.yellow, setRest]);

//   return (
//     <div className="formcontainer">
//       <form className="mt-4" onSubmit={handlesubmit}>
//         <div className="close-btn" onClick={handleclose}>
//           <MdClose />
//         </div>
//         <h3>Update Fee</h3>
//         <div className="form">
//           <div className="mb-3">
//             <label htmlFor="roll">Roll No.:</label>
//             <input
//               type="text"
//               id="roll"
//               name="roll"
//               onChange={handleOnChange}
//               value={rest.roll || ""}
//             />

//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               onChange={handleOnChange}
//               value={rest.name || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="father">Father:</label>
//             <input
//               type="text"
//               id="father"
//               name="father"
//               onChange={handleOnChange}
//               value={rest.father || ""}
//             />

//             <label htmlFor="class">Class:</label>
//             <input
//               type="text"
//               id="class"
//               name="class"
//               onChange={handleOnChange}
//               value={rest.class || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="english">English:</label>
//             <input
//               type="number"
//               id="english"
//               name="english"
//               onChange={handleOnChange}
//               value={rest.english || ""}
//             />

//             <label htmlFor="hindi">Hindi:</label>
//             <input
//               type="number"
//               id="hindi"
//               name="hindi"
//               onChange={handleOnChange}
//               value={rest.hindi || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="mathematics">Mathematics:</label>
//             <input
//               type="number"
//               id="mathematics"
//               name="mathematics"
//               onChange={handleOnChange}
//               value={rest.mathematics || ""}
//             />

//             <label htmlFor="science">Science:</label>
//             <input
//               type="number"
//               id="science"
//               name="science"
//               onChange={handleOnChange}
//               value={rest.science || ""}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="yellow">Social Science:</label>
//             <input
//               type="number"
//               id="yellow"
//               name="yellow"
//               onChange={handleOnChange}
//               value={rest.yellow || ""}
//             />

//             <label htmlFor="marks">Total Marks:</label>
//             <input
//               type="number"
//               id="marks"
//               name="marks"
//               value={rest.marks || ""}

//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="per">Percentage:</label>
//             <input
//               type="text"
//               id="per"
//               name="per"
//               value={rest.per || ""}

//             />

//             <button className="btn">Submit</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResultTable;
