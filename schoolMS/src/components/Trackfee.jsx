/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import "../components/Student.jsx";
import "../app.css";
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


axios.defaults.baseURL = "http://localhost:3000/";

const Trackfee = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    age: "",
    class: "",
    email: "",
    mobile: "",
    aadhar: "",
    address: "",
    fees: "",
    due: "",
    _id: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    father: "",
    age: "",
    class: "",
    email: "",
    mobile: "",
    aadhar: "",
    address: "",
    fees: "",
    due: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...dataToSend } = formData;
      const response = await axios.post("/createinfo", dataToSend);
      if (response.status === 200) {
        setAddSection(false);
        alert(response.data.message);
        getFetchData();
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
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

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
        alert(response.data.message);
        setEditSection(false);
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
      email: el.email,
      mobile: el.mobile,
      aadhar: el.aadhar,
      address: el.address,
      fees: el.fees,
      feesdue: el.due,
      mode:el.mode,
    });
    setEditSection(true);
  };

  const handlePrintSlip = (el) => {
    const printWindow = window.open("", "Print Fee Slip", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Slip</title>
          <style>
            /* Add your print styles here */
            .fee-slip {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid black;
              width: 80mm;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
            }
            .header h1 {
              font-size: 16px;
              margin: 0;
            }
            .header h2 {
              font-size: 14px;
              margin: 0;
            }
            .header p {
              font-size: 12px;
              margin: 0;
            }
            .fee-slip table {
              width: 100%;
              margin-bottom: 10px;
              border-collapse: collapse;
            }
            .fee-slip table, .fee-slip th, .fee-slip td {
              border: none;
              padding: 5px;
              font-size: 12px;
            }
            .fee-slip th {
              text-align: left;
              width: 50%;
            }
            .fee-slip td {
              text-align: right;
              width: 50%;
            }
            .amount {
              text-align: right;
              margin-top: 20px;
              font-weight: bold;
            }
            .footer {
              text-align: right;
              font-size: 12px;
              margin-top: 10px;
            }
            .stamp {
              text-align: right;
              margin-top: 20px;
              font-size: 12px;
            }
            .tally-user {
              text-align: left;
              margin-top: 10px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="fee-slip">
            <div class="header">
              <h1>INSTITUTE OF TECHNOLOGY AND MANAGEMENT</h1>
              <p>ITM CAMPUS OPP. SITHOLI</p>
              <p>RAILWAY STATION JHANSI ROAD, GWALIOR</p>
              <p>Phone: 000-00000000</p>
            </div>
            <table>
              <tr><th>Student Name:</th><td>${el.name}</td></tr>
              <tr><th>Father Name:</th><td>${el.father}</td></tr>
              <tr><th> Roll No.:</th><td>${el._id}</td></tr>
               <tr><th>Class:</th><td>${el.class}</td></tr>
              <tr><th>Date of Submission:</th><td>${el.date}</td></tr>
            </table>
            <table>
              <tr><th>Particular</th><th>Amount</th></tr>
            </table>
            <div class="amount">
              <p>TOTAL: ${el.fees}</p>
               <p>Balance Due : ${el.due}</p>
            </div>
            <div class="footer">
              <p>By Cash/Cheque: ${el.mode}</p>
              <p>Drawn on:</p>
            </div>
            <div class="stamp">
              <p>_____________________________</p>
              <p>Cashier</p>
            </div>
            <div class="tally-user">
              <p>Tally User: ${el.tallyUser}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  


  // // Function to print the fee slip
  // const handlePrintSlip = (el) => {
  //   const printWindow = window.open("", "Print Fee Slip", "width=800,height=600");
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Fee Slip</title>
  //         <style>
  //           /* Add your print styles here */
  //           .fee-slip {
  //             font-family: Arial, sans-serif;
  //             padding: 20px;
  //           }
  //           .fee-slip h2 {
  //             text-align: center;
  //             margin-bottom: 20px;
  //           }
  //           .fee-slip table {
  //             width: 100%;
  //             margin-bottom: 20px;
  //             border-collapse: collapse;
  //           }
  //           .fee-slip table, .fee-slip th, .fee-slip td {
  //             border: 1px solid black;
  //             padding: 10px;
  //           }
  //           .fee-slip th {
  //             text-align: left;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="fee-slip">
  //           <h2>Fee Slip</h2>
  //           <table>
  //             <tr><th>Name:</th><td>${el.name}</td></tr>
  //             <tr><th>Father's Name:</th><td>${el.father}</td></tr>
  //             <tr><th>Class:</th><td>${el.class}</td></tr>
  //             <tr><th>Total Fees:</th><td>${el.fees}</td></tr>
  //             <tr><th>Due Fees:</th><td>${el.due}</td></tr>
  //              <tr><th>Due Fees:</th><td>${el.date}</td></tr>
  //           </table>
  //           <p>Thank you for your payment.</p>
  //         </div>
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   printWindow.print();
  // };

  return (
    <div className="container">
      {addSection && (
        <Feestable
          handlesubmit={handlesubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Feestable
          handlesubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Father</th>
              <th>Total Fee</th>
              <th>Due Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.father}</td>
                  <td>{el.fees}</td>
                  <td>{el.due}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(el)}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(el._id)}
                    >
                      <MdDelete />
                    </button>
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
    </div>
  );
};

export default Trackfee;






















// /* eslint-disable no-unused-vars */
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
// import { NavLink } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

// axios.defaults.baseURL = "http://localhost:3000/";

// const Trackfee = () => {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
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
//     _id: "",
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
//   });

//   const [dataList, setDataList] = useState([]);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormData((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Ensure _id is not part of formData when creating a new entry
//       const { _id, ...dataToSend } = formData;
//       const response = await axios.post("/createinfo", dataToSend);
//       console.log(response);
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
//       console.log("Fetching data from /getinfo");
//       const data = await axios.get("/getinfo");
//       console.log("Data received:", data);
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

//   const handleEditOnChange = async (e) => {
//     const { value, name } = e.target;
//     setFormDataEdit((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
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
//     });
//     setEditSection(true);
//   };

//   return (
//     <div className="container">
//       {addSection && (
//         <Feestable
//           handlesubmit={handlesubmit}
//           handleOnChange={handleOnChange}
//           handleclose={() => setAddSection(false)}
//           rest={formData}
//         />
//       )}
//       {editSection && (
//         <Feestable
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
//               <th>Name</th>
//               <th>Father</th>
//               {/* <th>DOB</th>
//                 <th>class</th> */}
//               <th>Total Fee</th>
//               <th>Due Fee</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length > 0 ? (
//               dataList.map((el) => (
//                 <tr key={el._id}>
//                   <td>{el.name}</td>
//                   <td>{el.father}</td>
//                   {/* <td>{el.age}</td>
//                     <td>{el.class}</td> */}
//                   <td>{el.fees}</td>
//                   <td>{el.due}</td>
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
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>
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

// export default Trackfee;
