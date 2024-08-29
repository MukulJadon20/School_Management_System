/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "../components/Student.jsx";
import "../App.css";
import { MdClose } from "react-icons/md";
import axios from "axios";
//import Formtable from "./formtable";
import Feestable from "./Feestable";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoPrintSharp } from "react-icons/io5";
import { baseUrl } from "./urls";
import ResultTable from "./ResultTable";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

axios.defaults.baseURL = `${baseUrl}/`;

const Result = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    age: "",
    class: "",
    hindi: "",
    mathematics: "",
    science: "",
    roll: "",
    yellow: "",
    marks: "",
    per: "",
    grade: "",
    _id: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    father: "",
    age: "",
    class: "",
    english: "",
    hindi: "",
    mathematics: "",
    science: "",
    roll: "",
    yellow: "",
    marks: "",
    per: "",
    grade: "",
  });

  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...dataToSend } = formData;
      const response = await axios.post("/createinfo", dataToSend);
      if (response.status === 200) {
        setAddSection(false);
        alert(response.data.message);
        setShowSuccessMessage(true); // Show the success messa
        getFetchData();
         // Hide the success message after 3 seconds
         setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.error(
        "Error during submission:",
        error.response ? error.response.data : error.message
      );
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/getinfo");
      if (data.data.success) {
        const filteredData = data.data.data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.roll.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDataList(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []); // Refetch data when searchQuery changes

  const handleDelete = async (id) => {
    const data = await axios.delete("/deleteinfo/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!formDataEdit._id) {
        throw new Error("ID is missing");
      }
      const response = await axios.put(
        `/updateinfo/${formDataEdit._id}`,
        formDataEdit
      );
      if (response.data.success) {
        getFetchData();
        // alert(response.data.message);
        setEditSection(false);
        setShowSuccessMessage(true); // Show the success message
        // Hide the success message after 3 seconds
        setTimeout(() => setShowSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error(
        "Error during update:",
        error.response ? error.response.data : error.message
      );
      alert("There was an error updating the data. Please try again.");
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      _id: el._id,
      name: el.name,
      father: el.father,
      age: el.age,
      class: el.class,
      english: el.english,
      hindi: el.hindi,
      mathematics: el.mathematics,
      science: el.science,
      roll: el.roll,
      yellow: el.yellow,
      marks: el.marks,
      grade: el.grade,
    });
    setEditSection(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredDataList = dataList.filter((el) => {
    const name = el.name ? el.name.toString().toLowerCase() : "";
    const father = el.father ? el.father.toString().toLowerCase() : "";
    const age = el.age ? el.age.toString().toLowerCase() : "";
    const className = el.class ? el.class.toString().toLowerCase() : "";
    const roll = el.roll ? el.roll.toString().toLowerCase() : "";

    return (
      name.includes(searchQuery) ||
      father.includes(searchQuery) ||
      age.includes(searchQuery) ||
      className.includes(searchQuery) ||
      roll.includes(searchQuery)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDataList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredDataList.length / itemsPerPage);

  const handlePrintSlip = (el) => {
    const printWindow = window.open(
      "",
      "Print Result",
      "width=800,height=1200"
    );
    printWindow.document.write(`
      <html>
        <head>
          <title>Result Slip</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .result-slip {
              padding: 20px;
              width: 210mm; /* A4 size */
              height: 297mm; /* A4 size */
              margin: 0 auto;
              border: 1px solid #000;
              background-image: url('path_to_your_marksheet_background_image.jpg'); /* Replace with the path to your background image */
              background-size: cover;
              background-position: center;
              color: #000; /* Adjust text color for better visibility on background */
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 20px;
              margin: 0;
            }
            .header h2 {
              font-size: 16px;
              margin: 0;
            }
            .header p {
              font-size: 14px;
              margin: 0;
            }
            .student-info, .result-info {
              margin-bottom: 20px;
            }
            .student-info table, .result-info table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }
            .student-info th, .result-info th, .student-info td, .result-info td {
              border: 1px solid #000;
              padding: 8px;
              font-size: 14px;
            }
            .student-info th, .result-info th {
              text-align: left;
            }
            .student-info td, .result-info td {
              text-align: right;
            }
            .footer {
              text-align: right;
              font-size: 14px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="result-slip">
            <div class="header">
              <h1>Board of Secondary Education, Madhya Pradesh</h1>
              <h2>Class 10th Result</h2>
              <p>Academic Year: 2023-2024</p>
            </div>
            <div class="student-info">
              <table>
                <tr><th>Student Name:</th><td>${el.name}</td></tr>
                <tr><th>Father Name:</th><td>${el.father}</td></tr>
                <tr><th>Roll No.:</th><td>${el.roll}</td></tr>
                <tr><th>Class:</th><td>${el.class}</td></tr>
                <tr><th>Date of Birth:</th><td>${el.age}</td></tr>
              </table>
            </div>
            <div class="result-info">
              <table>
                <tr><th>Subject</th><th>Marks Obtained</th><th>Total Marks</th></tr>
                <tr><td>English</td><td>${el.english}</td><td>100</td></tr>
                <tr><td>Hindi</td><td>${el.hindi}</td><td>100</td></tr>
                <tr><td>Mathematics</td><td>${el.mathematics}</td><td>100</td></tr>
                <tr><td>Science</td><td>${el.science}</td><td>100</td></tr>
                <tr><td>Social Science</td><td>${el.yellow}</td><td>100</td></tr>
              </table>
              <div class="footer">
                <p>Total Marks: ${el.marks}</p>
                <p>Percentage: ${el.per}%</p>
                <p>Grade: ${el.grade}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container">
       <div className="search-bar">
        <div className="icon">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="  Search by name, DOB, or father's name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {addSection && (
        <ResultTable
        handlesubmit={handlesubmit}
        handleOnChange={handleOnChange}
        handleclose={() => setAddSection(false)}
        rest={formData}
        />
      )}
      {editSection && (
        <ResultTable
        handlesubmit={handleUpdate}
        handleOnChange={handleEditOnChange}
        handleclose={() => setEditSection(false)}
        rest={formDataEdit}
        />
      )}

           {/* Display success message */}
           {showSuccessMessage && (
        <div
          className="alert alert-success"
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "1000",
          }}
        >
          <IoCheckmarkDoneCircle /> Marks Saved Successfully!
        </div>
      )}
     
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Roll No.</th>
              <th> Student Name</th>
              <th>Class</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((el) => (
                <tr key={el._id}>
                  <td>{el.roll}</td>
                  <td>{el.name}</td>
                  <td>{el.class}</td>
                  <td>{el.marks}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(el)}
                    >
                      <MdModeEdit />
                    </button>
                    {/* <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(el._id)}
                    >
                      <MdDelete />
                    </button> */}
                    <button
                      className="btn btn-print"
                      onClick={() => handlePrintSlip(el)}
                    >
                      <IoPrintSharp />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Result;

//  /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// // import "../components/Student.jsx";
// import "../app.css";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// //import Formtable from "./formtable";
// import Feestable from "./Feestable";
// import { FaEye } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { IoPrintSharp } from "react-icons/io5";
// import { FaPrint } from "react-icons/fa";
// import { baseUrl } from "./urls";
// import ResultTable from "./ResultTable";

// axios.defaults.baseURL = `${baseUrl}/`;

// const Result = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
// name: "",
// father: "",
// age: "",
// class: "",
// email: "",
// mobile: "",
// aadhar: "",
// address: "",
// fees: "",
// due: "",
// english: "",
// hindi: "",
// mathematics: "",
// science: "",
// roll: "",
// yellow: "",
// marks: "",
// _id: "",
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     father: "",
//     age: "",
//     class: "",
//     email: "",
//     mobile: "",
//     aadhar: "",
//     address: "",
//     fees: "",
//     due: "",
//     english: "",
//     hindi: "",
//     mathematics: "",
//     science: "",
//     roll: "",
//     yellow: "",
//     marks: "",
//   });

//   const [dataList, setDataList] = useState([]);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormData((preve) => ({
//       ...preve,
//       [name]: value,
//     }));
//   };

//   const handlesubmit = async (e) => {
//     // e.preventDefault();
//     try {
//       const { _id, ...dataToSend } = formData;
//       const response = await axios.post("/updateinfo", dataToSend);
//       if (response.status === 200) {
//         setAddSection(false);
//         alert(response.data.message);
//         getFetchData();
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response ? error.response.data : error.message
//       );
//       alert("There was an error submitting the form. Please try again.");
//     }
//   };

//   const getFetchData = async () => {
//     try {
//       const data = await axios.get("/getinfo");
//       if (data.data.success) {
//         setDataList(data.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getFetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     const data = await axios.delete("/deleteinfo/" + id);
//     if (data.data.success) {
//       getFetchData();
//       alert(data.data.message);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formDataEdit._id) {
//         throw new Error("ID is missing");
//       }
//       const response = await axios.put(
//         `/updateinfo/${formDataEdit._id}`,
//         formDataEdit
//       );
//       if (response.data.success) {
//         getFetchData();
//         alert(response.data.message);
//         setEditSection(false);
//       }
//     } catch (error) {
//       console.error(
//         "Error during update:",
//         error.response ? error.response.data : error.message
//       );
//       alert("There was an error updating the data. Please try again.");
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormDataEdit((preve) => ({
//       ...preve,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (el) => {
//     setFormDataEdit({
//       _id: el._id,
//       name: el.name,
//       father: el.father,
//       age: el.age,
//       class: el.class,
//       email: el.email,
//       mobile: el.mobile,
//       aadhar: el.aadhar,
//       address: el.address,
//       fees: el.fees,
//       feesdue: el.due,
//       mode: el.mode,
//       english: el.english,
//       hindi: el.hindi,
//       mathematics: el.mathematics,
//       science: el.science,
//       roll: el.roll,
//       yellow: el.yellow,
//       marks: el.marks,
//     });
//     setEditSection(true);
//   };

//   const handleGenerateResult = (el) => {
//     // Navigate to the Result page with student ID
//     navigate(`resultgenerate/${el._id}`);
//   };

//   return (
//     <div className="container">
//       {addSection && (
//         <ResultTable
//           handlesubmit={handlesubmit}
//           handleOnChange={handleOnChange}
//           handleclose={() => setAddSection(false)}
//           rest={formData}
//         />
//       )}
//       {editSection && (
//         <ResultTable
//           handlesubmit={handleUpdate}
//           handleOnChange={handleEditOnChange}
//           handleclose={() => setEditSection(false)}
//           rest={formDataEdit}
//         />
//       )}

//       <div className="tableContainer">
//         <table>
//           <thead>
//             <tr>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Class</th>
//               <th>Marks</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length > 0 ? (
//               dataList.map((el) => (
//                 <tr key={el._id}>
// <td>{el.roll}</td>
// <td>{el.name}</td>
// <td>{el.class}</td>
// <td>{el.marks}</td> {/* Display total marks */}
//                   <td>
//                     <button
//                       className="btn btn-edit"
//                       onClick={() => handleEdit(el)}
//                     >
//                       <MdModeEdit />
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(el._id)}
//                     >
//                       <MdDelete />
//                     </button>
//                     <button
//                       className="btn btn-generate"
//                       onClick={() => handleGenerateResult(el)}
//                     >
//                       <FaPrint /> Result
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   No Data
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Result;
//  /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// // import "../components/Student.jsx";
// import "../app.css";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// //import Formtable from "./formtable";
// import Feestable from "./Feestable";
// import { FaEye } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { IoPrintSharp } from "react-icons/io5";
// import { FaPrint } from "react-icons/fa";
// import { baseUrl } from "./urls";
// import ResultTable from "./ResultTable";

// axios.defaults.baseURL = `${baseUrl}/`;

// const Result = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
// name: "",
// father: "",
// age: "",
// class: "",
// email: "",
// mobile: "",
// aadhar: "",
// address: "",
// fees: "",
// due: "",
// english: "",
// hindi: "",
// mathematics: "",
// science: "",
// roll: "",
// yellow: "",
// marks: "",
// _id: "",
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     father: "",
//     age: "",
//     class: "",
//     email: "",
//     mobile: "",
//     aadhar: "",
//     address: "",
//     fees: "",
//     due: "",
//     english: "",
//     hindi: "",
//     mathematics: "",
//     science: "",
//     roll: "",
//     yellow: "",
//     marks: "",
//   });

//   const [dataList, setDataList] = useState([]);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormData((preve) => ({
//       ...preve,
//       [name]: value,
//     }));
//   };

//   const handlesubmit = async (e) => {
//     // e.preventDefault();
//     try {
//       const { _id, ...dataToSend } = formData;
//       const response = await axios.post("/updateinfo", dataToSend);
//       if (response.status === 200) {
//         setAddSection(false);
//         alert(response.data.message);
//         getFetchData();
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response ? error.response.data : error.message
//       );
//       alert("There was an error submitting the form. Please try again.");
//     }
//   };

//   const getFetchData = async () => {
//     try {
//       const data = await axios.get("/getinfo");
//       if (data.data.success) {
//         setDataList(data.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getFetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     const data = await axios.delete("/deleteinfo/" + id);
//     if (data.data.success) {
//       getFetchData();
//       alert(data.data.message);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formDataEdit._id) {
//         throw new Error("ID is missing");
//       }
//       const response = await axios.put(
//         `/updateinfo/${formDataEdit._id}`,
//         formDataEdit
//       );
//       if (response.data.success) {
//         getFetchData();
//         alert(response.data.message);
//         setEditSection(false);
//       }
//     } catch (error) {
//       console.error(
//         "Error during update:",
//         error.response ? error.response.data : error.message
//       );
//       alert("There was an error updating the data. Please try again.");
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormDataEdit((preve) => ({
//       ...preve,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (el) => {
//     setFormDataEdit({
//       _id: el._id,
//       name: el.name,
//       father: el.father,
//       age: el.age,
//       class: el.class,
//       email: el.email,
//       mobile: el.mobile,
//       aadhar: el.aadhar,
//       address: el.address,
//       fees: el.fees,
//       feesdue: el.due,
//       mode: el.mode,
//       english: el.english,
//       hindi: el.hindi,
//       mathematics: el.mathematics,
//       science: el.science,
//       roll: el.roll,
//       yellow: el.yellow,
//       marks: el.marks,
//     });
//     setEditSection(true);
//   };

//   const handleGenerateResult = (el) => {
//     // Navigate to the Result page with student ID
//     navigate(`resultgenerate/${el._id}`);
//   };

//   return (
//     <div className="container">
//       {addSection && (
//         <ResultTable
//           handlesubmit={handlesubmit}
//           handleOnChange={handleOnChange}
//           handleclose={() => setAddSection(false)}
//           rest={formData}
//         />
//       )}
//       {editSection && (
//         <ResultTable
//           handlesubmit={handleUpdate}
//           handleOnChange={handleEditOnChange}
//           handleclose={() => setEditSection(false)}
//           rest={formDataEdit}
//         />
//       )}

//       <div className="tableContainer">
//         <table>
//           <thead>
//             <tr>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Class</th>
//               <th>Marks</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length > 0 ? (
//               dataList.map((el) => (
//                 <tr key={el._id}>
// <td>{el.roll}</td>
// <td>{el.name}</td>
// <td>{el.class}</td>
// <td>{el.marks}</td> {/* Display total marks */}
//                   <td>
//                     <button
//                       className="btn btn-edit"
//                       onClick={() => handleEdit(el)}
//                     >
//                       <MdModeEdit />
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(el._id)}
//                     >
//                       <MdDelete />
//                     </button>
//                     <button
//                       className="btn btn-generate"
//                       onClick={() => handleGenerateResult(el)}
//                     >
//                       <FaPrint /> Result
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   No Data
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Result;
