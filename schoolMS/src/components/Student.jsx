/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import Formtable from "./Formtable";
import Formedit from "./Formedit";
import { FaEye, FaSearch } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { baseUrl } from "./urls";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

axios.defaults.baseURL = `${baseUrl}/`;

const Student = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    age: "",
    gender: "",
    class: "",
    email: "",
    mobile: "",
    aadhar: "",
    address: "",
    addmission: "",
    mode: "",
    roll: "",
    _id: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    father: "",
    age: "",
    gender: "",
    class: "",
    email: "",
    mobile: "",
    aadhar: "",
    address: "",
    addmission: "",
    mode: "",
    roll: "",
  });

  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust as needed
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...dataToSend } = formData;
      const response = await axios.post("/createinfo", dataToSend);
      if (response.status === 200) {
        setAddSection(false); // Hide the form
        setEditSection(false); // Ensure edit section is hidden if open
        setShowSuccessMessage(true); // Show the success message
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
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/deleteinfo/${studentToDelete}`);
      if (response.data.success) {
        getFetchData();
        setShowDeleteModal(false);
        setStudentToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
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
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      _id: el._id,
      name: el.name,
      father: el.father,
      age: el.age,
      gender: el.gender,
      class: el.class,
      email: el.email,
      mobile: el.mobile,
      aadhar: el.aadhar,
      address: el.address,
      addmission: el.addmission,
      mode: el.mode,
      roll: el.roll,
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

  return (
    <div className="container">
      <div className="search-bar">
        <div className="icon">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search by name, DOB, or father's name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <button className="btn btn-add" onClick={() => setAddSection(true)}>
        <BsPersonFillAdd />
        Enroll
      </button>
      {addSection && (
        <Formtable
          handlesubmit={handlesubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Formedit
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
          <IoCheckmarkDoneCircle /> Student Enrolled successfully!
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h4>Are you sure you want to delete this Student?</h4>
            <div className="d-flex justify-content-around mt-4">
              <button
                className="btn btn-danger"
                style={{ marginRight: "10px" }}
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((el) => (
                <tr key={el._id}>
                  <td>{el.roll}</td>
                  <td>{el.name}</td>
                  <td>{el.age}</td>
                  <td>{el.class}</td>
                  <td>
                    <NavLink to={`view/${el._id}`}>
                      <button className="btn btn-view">
                        <FaEye />
                      </button>
                    </NavLink>
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

export default Student;

// Styles for modal
const modalStyles = {
  // position: 'fixed',
  // top: 0,
  // left: 0,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxwidth: "20%",
  maxheight: "20%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import "../App.css";
// import axios from "axios";
// import Formtable from "./Formtable";
// import Formedit from "./Formedit";
// import { FaEye } from "react-icons/fa";
// import { MdModeEdit, MdDelete, MdClose } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { baseUrl } from "./urls";

// axios.defaults.baseURL = `${baseUrl}/`;

// const Student = () => {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     father: "",
//     age: "",
//     gender: "",
//     class: "",
//     email: "",
//     mobile: "",
//     aadhar: "",
//     address: "",
//     addmission: "",
//     mode: "",
//     roll: "",
//     _id: "",
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     father: "",
//     age: "",
//     gender:"",
//     class: "",
//     email: "",
//     mobile: "",
//     aadhar: "",
//     address: "",
//     addmission: "",
//     mode: "",
//     roll: "",
//   });

//   const [dataList, setDataList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { _id, ...dataToSend } = formData;
//       const response = await axios.post("/createinfo", dataToSend);
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
//     setFormDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (el) => {
//     setFormDataEdit({
//       _id: el._id,
//       name: el.name,
//       father: el.father,
//       age: el.age,
//       gender:el.gender,
//       class: el.class,
//       email: el.email,
//       mobile: el.mobile,
//       aadhar: el.aadhar,
//       address: el.address,
//       addmission: el.addmission,
//       mode: el.mode,
//       roll: el.roll,
//     });
//     setEditSection(true);
//   };

//   // Function to handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredDataList = dataList.filter((el) => {
//     // Ensure that each property is defined before calling toLowerCase
//     const name = el.name ? el.name.toLowerCase() : "";
//     const father = el.father ? el.father.toLowerCase() : "";
//     const age = el.age ? el.age.toLowerCase() : "";
//     const className = el.class ? el.class.toLowerCase() : "";
//     const roll = el.roll ? el.class.toLowerCase() : "";

//     return (
//       name.includes(searchQuery) ||
//       father.includes(searchQuery) ||
//       age.includes(searchQuery) ||
//       className.includes(searchQuery) ||
//       roll.includes(searchQuery)
//     );
//   });

//   return (
//     <div className="container">
//       <div className="search-bar">
//         <div className="icon">
//           <FaSearch />
//         </div>
//         <input
//           type="text"
//           placeholder="  Search by name, DOB, or father's name"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <button className="btn btn-add" onClick={() => setAddSection(true)}>
//         Enroll Student
//       </button>
//       {addSection && (
//         <Formtable
//           handlesubmit={handlesubmit}
//           handleOnChange={handleOnChange}
//           handleclose={() => setAddSection(false)}
//           rest={formData}
//         />
//       )}
//       {editSection && (
//         <Formedit
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
//               <th>DOB</th>
//               <th>Class</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDataList.length > 0 ? (
//               filteredDataList.map((el) => (
//                 <tr key={el._id}>
//                   <td>{el.roll}</td>
//                   <td>{el.name}</td>
//                   <td>{el.age}</td>
//                   <td>{el.class}</td>
//                   <td>
//                     <NavLink to={`view/${el._id}`}>
//                       <button className="btn btn-view">
//                         <FaEye />
//                       </button>
//                     </NavLink>
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

// export default Student;
