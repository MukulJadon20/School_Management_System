/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { IoMdMail } from "react-icons/io";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineClass, MdLocationOn, MdModeEdit, MdDelete, MdClose } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Formedit from "./Formedit";
import { FaSearchLocation } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

const View = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    getFetchData();
  }, [id]);

  const getFetchData = async () => {
    try {
      console.log("Fetching data for ID:", id); // Debugging line
      const response = await axios.get(`/getinfo/${id}`);
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/deleteinfo/${id}`);
        navigate("/dashboard/student"); // Redirect to the specified page after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const [editSection, setEditSection] = useState(false);

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    father: "",
    age: "",
    class: "",
    email: "",
    mobile: "",
    aadhar: "",
    address: "",
  });

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
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (formData) => {
    setFormDataEdit({
      _id: formData._id,
      name: formData.name,
      father: formData.father,
      age: formData.age,
      class: formData.class,
      email: formData.email,
      mobile: formData.mobile,
      aadhar: formData.aadhar,
      address: formData.address,
    });
    setEditSection(true);
  };

  const handleClose = () => {
    navigate("/dashboard/student");
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="cardContent">
          <div className="close-btn" onClick={handleClose}>
            <MdClose />
          </div>
          {editSection && (
            <Formedit
              handlesubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )}
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src="/public/image/user-profile-icon-free-vector.jpg"
                style={{ width: 50 }}
                alt="profile"
              />
              <h3 className="mt-3 ">
                Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
              </h3>
              <h3 className="mt-3 ">
                Father:{" "}
                <span style={{ fontWeight: 400 }}>{formData.father}</span>
              </h3>
              <h3 className="mt-3">
                DOB: <span style={{ fontWeight: 400 }}>{formData.age}</span>
              </h3>
              <p className="mt-3">
                <MdOutlineClass />
                Class: <span>{formData.class}</span>
              </p>
              <p className="mt-3">
              <FaTransgender />
                Gender: <span>{formData.gender}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <div className="add-btn">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(formData)}
                >
                  <MdModeEdit />
                </button>
                <button className="btn btn-delete" onClick={handleDelete}>
                  <MdDelete />
                </button>
              </div>
              <p className="mt-4">
                <FaMobileAlt /> Mobile: <span>{formData.mobile}</span>
              </p>
              <p className="mt-3">
                <IoMdMail />
                Email: <span>{formData.email}</span>
              </p>
              <p className="mt-3">
                <MdLocationOn />
                Address: <span>{formData.address}</span>
              </p>
              <p className="mt-3">
              <FaSearchLocation />
                Pincode: <span>{formData.pincode}</span>
              </p>
              <p className="mt-3">
                <FaAddressCard /> Aadhar: <span>{formData.aadhar}</span>
              </p>
              <p className="mt-3">
              <MdDateRange /> Date of Addmission: <span>{formData.addmission}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
















// import React, { useEffect, useState } from "react";
// import "../app.css";
// import axios from "axios";
// import { IoMdMail } from "react-icons/io";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdOutlineClass } from "react-icons/md";
// import { MdLocationOn } from "react-icons/md";
// import { FaAddressCard } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { useNavigate, useParams } from "react-router-dom";
// import Formedit from "./Formedit";
// import { MdClose } from "react-icons/md";

// const View = () => {
//   const [formData, setFormData] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();
// //  
//   useEffect(() => {
//     getFetchData();
//   }, []);

//   const getFetchData = async () => {
//     try {
//       console.log("Fetching data for ID:", id); // Debugging line
//       const response = await axios.get(`/getinfo/${id}`);
//       if (response.data.success) {
//         setFormData(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   //   useEffect(() => {
//   //     const getFetchData = async () => {
//   //       try {
//   //         console.log("Fetching data for ID:", id);  // Debugging line
//   //         const response = await axios.get(`/getinfo/${id}`);
//   //         if (response.data.success) {
//   //           setFormData(response.data.data);
//   //         }
//   //       } catch (error) {
//   //         console.error("Error fetching data:", error);
//   //       }
//   //     };

//   //     getFetchData();
//   //   }, [id]);

//   //   const handleEdit = () => {
//   //     navigate(`/edit/${id}`, { state: { formData } });
//   //   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this data?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`/deleteinfo/${id}`);
//         navigate("/dashboard/student"); // Redirect to the specified page after deletion
//       } catch (error) {
//         console.error("Error deleting data:", error);
//       }
//     }
//   };

//   const [editSection, setEditSection] = useState(false);

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     father: "",
//     age: "",
//     class: "",
//     email: "",
//     mobile: "",
//     aadhar: "",
//     address: "",
//   });

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

//   const handleEdit = (formData) => {
//     setFormDataEdit({
//       _id: formData._id,
//       name: formData.name,
//       father: formData.father,
//       age: formData.age,
//       class: formData.class,
//       email: formData.email,
//       mobile: formData.mobile,
//       aadhar: formData.aadhar,
//       address: formData.address,
//     });
//     setEditSection(true);
//   };

//   const handleClose = () => {
//     navigate("/dashboard/student");
//   };

//   return (
//     <div className="container mt-3">
//       <div className="card">
//         <div className="cardContent">
//           <div className="close-btn" onClick={handleclose}>
//             <MdClose />
//           </div>
//           {editSection && (
//             <Formedit
//               handlesubmit={handleUpdate}
//               handleOnChange={handleEditOnChange}
//               handleclose={() => setEditSection(false)}
//               rest={formDataEdit}
//             />
//           )}
//           <div className="row">
//             <div className="left_view col-lg-6 col-md-6 col-12">
//               <img
//                 src="/public/image/user-profile-icon-free-vector.jpg"
//                 style={{ width: 50 }}
//                 alt="profile"
//               />
//               <h3 className="mt-3 ">
//                 Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
//               </h3>
//               <h3 className="mt-3 ">
//                 Father:{" "}
//                 <span style={{ fontWeight: 400 }}>{formData.father}</span>
//               </h3>
//               <h3 className="mt-3">
//                 Age: <span style={{ fontWeight: 400 }}>{formData.age}</span>
//               </h3>
//               <p className="mt-3">
//                 <MdOutlineClass />
//                 Class: <span>{formData.class}</span>
//               </p>
//             </div>
//             <div className="right_view col-lg-6 col-md-6 col-12">
//               <div className="add-btn mt-4">
//                 <button
//                   className="btn btn-edit"
//                   onClick={() => handleEdit(formData)}
//                 >
//                   <MdModeEdit />
//                 </button>
//                 <button className="btn btn-delete" onClick={handleDelete}>
//                   <MdDelete />
//                 </button>
//               </div>
//               <p className="mt-5">
//                 <FaMobileAlt /> Mobile: <span>{formData.mobile}</span>
//               </p>
//               <p className="mt-3">
//                 <IoMdMail />
//                 Email: <span>{formData.email}</span>
//               </p>
//               <p className="mt-3">
//                 <MdLocationOn />
//                 Address: <span>{formData.address}</span>
//               </p>
//               <p className="mt-3">
//                 <FaAddressCard /> Aadhar: <span>{formData.aadhar}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;

// import React, { useEffect, useState } from "react";
// import "../app.css";
// import axios from "axios";
// import { IoMdMail } from "react-icons/io";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdOutlineClass } from "react-icons/md";
// import { MdLocationOn } from "react-icons/md";
// import { FaAddressCard } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { Navigate, useParams } from "react-router-dom";
// import { useNavigate,useLocation } from "react-router-dom";

// const View = () => {
//   const [formData, setFormData] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getFetchData = async () => {
//       try {
//         console.log("Fetching data for ID:", id);  // Debugging line
//         const response = await axios.get(`/getinfo/${id}`);
//         if (response.data.success) {
//           setFormData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getFetchData();
//   }, [id]);

//   const location = useLocation();
//   const { formData } = location.state;

//   const handleSave = async () => {
//     try {
//       // Perform the save operation (e.g., update the record in the database)
//       await axios.put(`/updateinfo/${formData._id}`, formData);

//       // After saving, navigate back to the student dashboard
//       navigate("/dashboard/student");
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this data?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`/deleteinfo/${id}`);
//         navigate("/dashboard/student"); // Redirect to the specified page after deletion
//       } catch (error) {
//         console.error("Error deleting data:", error);
//       }
//     }
//   };
//   return (
//     <div className="container mt-3">
//       <div className="card">
//         <div className="cardContent">
//           <div className="row">
//             <div className="left_view col-lg-6 col-md-6 col-12">
//               <img
//                 src="/public/image/user-profile-icon-free-vector.jpg"
//                 style={{ width: 50 }}
//                 alt="profile"
//               />
//               <h3 className="mt-3 ">
//                 Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
//               </h3>
//               <h3 className="mt-3 ">
//                 Father: <span style={{ fontWeight: 400 }}>{formData.father}</span>
//               </h3>
//               <h3 className="mt-3">
//                 Age: <span style={{ fontWeight: 400 }}>{formData.age}</span>
//               </h3>
//               <p className="mt-3">
//                 <MdOutlineClass />
//                 Class: <span>{formData.class}</span>
//               </p>
//             </div>
//             <div className="right_view col-lg-6 col-md-6 col-12">
//               <div className="add-btn mt-4">
//                 <button
//                   className="btn btn-edit"
//                   onClick={handleSave}
//                 >
//                   <MdModeEdit />
//                 </button>
//                 <button
//                   className="btn btn-delete"
//                   onClick={() => handleDelete(formData._id)}
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//               <p className="mt-5">
//                 <FaMobileAlt /> Mobile: <span>{formData.mobile}</span>
//               </p>
//               <p className="mt-3">
//                 <IoMdMail />
//                 Email: <span>{formData.email}</span>
//               </p>
//               <p className="mt-3">
//                 <MdLocationOn />
//                 Address: <span>{formData.address}</span>
//               </p>
//               <p className="mt-3">
//                 <FaAddressCard /> Aadhar: <span>{formData.aadhar}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// // import "../components/Student.jsx";
// import "../app.css";
// //import { MdClose } from "react-icons/md";
// import axios from "axios";
// //import Formtable from "./formtable";
// //import Formedit from "./Formedit";
// ////import { FaEye } from "react-icons/fa";
// //import { MdModeEdit } from "react-icons/md";
// //import { MdDelete } from "react-icons/md";
// //import { Link } from "react-router-dom";
// //import { NavLink } from "react-router-dom";
// import { IoMdMail } from "react-icons/io";
// import { FaMobileAlt } from "react-icons/fa";
// import { MdOutlineClass } from "react-icons/md";
// import { MdLocationOn } from "react-icons/md";
// import { FaAddressCard } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { useParams } from "react-router-dom";

// const View = () => {

//     const [formData, setFormData] = useState({});
//     const { id } = useParams();

//     const getFetchData = async () => {
//       try {
//         const response = await axios.get(`/getinfo/${id}`);
//         if (response.data.success) {
//           setFormData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     useEffect(() => {
//       getFetchData();
//     }, [id]);

//     const handleEdit = (data) => {
//       // Handle edit functionality here
//     };

//     const handleDelete = async (id) => {
//       try {
//         await axios.delete(`/deleteinfo/${id}`);
//         // Handle post-delete logic, e.g., navigate away or show a success message
//       } catch (error) {
//         console.error("Error deleting data:", error);
//       }
//     };
//     // const [formData, setFormData] = useState([]);
//     // console.log(formData)

//     // const {id}=useParams("");
//     // console.log(id);

//     // const getFetchData = async () => {
//     //   try {
//     //     console.log('Fetching data from /getinfo');
//     //     const data = await axios.get(`/getinfo`);
//     //     console.log('Data received:', data);
//     //     if (data.data.success) {
//     //       setDataList(data.data.data);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching data:", error);
//     //   }
//     // };

//     // useEffect(() => {
//     //   getFetchData();
//     // }, []);

//   return (
//     <div className="constainer mt-3">
//       <div className="card">
//         <div className="cardContent">
//          <div className="row">
//          <div className="left_view col-lg-6 col-md-6 col-12">
//             <img
//               src="/public/image/user-profile-icon-free-vector.jpg"
//               style={{ width: 50 }}
//               alt="profile"
//             />
//             <h3 className="mt-3 ">
//               Name: <span style={{ fontWeight: 400 }}>{formData.name}</span>
//             </h3>
//             <h3 className="mt-3 ">
//               Father: <span style={{ fontWeight: 400 }}>name</span>
//             </h3>
//             <h3 className="mt-3">
//               Age: <span style={{ fontWeight: 400 }}>age</span>
//             </h3>
//             <p className="mt-3">
//               <MdOutlineClass />
//               class: <span>class</span>
//             </p>
//           </div>
//           <div className="right_view col-lg-6 col-md-6 col-12">

//             <div className="add-btn mt-4">
//             <button
//                         className="btn btn-edit"
//                         onClick={() => handleEdit(el)}
//                       >
//                        <MdModeEdit />
//                       </button>
//                       <button
//                         className="btn btn-delete"
//                         onClick={() => handleDelete(el._id)}
//                       >
//                        <MdDelete />
//                       </button>
//             </div>
//             <p className="mt-5">
//               <FaMobileAlt /> Mobile: <span>00000000000</span>
//             </p>

//             <p className="mt-3">
//               <IoMdMail />
//               Email: <span>email</span>
//             </p>
//             <p className="mt-3">
//               <MdLocationOn />
//               Address: <span>address</span>
//             </p>

//             <p className="mt-3">
//             <FaAddressCard /> Aadhar: <span>aadhar</span>
//             </p>
//           </div>
//          </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default View;