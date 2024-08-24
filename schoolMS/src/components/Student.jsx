import React, { useEffect, useState } from "react";
import "../app.css";
import axios from "axios";
import Formtable from "./formtable";
import Formedit from "./Formedit";
import { FaEye } from "react-icons/fa";
import { MdModeEdit, MdDelete, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:3000/";

const Student = () => {
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
    addmission:"",
    mode:"",
    roll:"",
    _id: ""
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
    addmission:"",
    mode:"",
    roll:"",
  });

  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        setAddSection(false);
        alert(response.data.message);
        getFetchData();
      }
    } catch (error) {
      console.error("Error during submission:", error.response ? error.response.data : error.message);
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
      const response = await axios.put(`/updateinfo/${formDataEdit._id}`, formDataEdit);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Error during update:", error.response ? error.response.data : error.message);
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
      class: el.class,
      email: el.email,
      mobile: el.mobile,
      aadhar: el.aadhar,
      address: el.address,
      addmission:el.addmission,
      mode:el.mode,
      roll:el.roll,
    });
    setEditSection(true);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredDataList = dataList.filter((el) => {
    // Ensure that each property is defined before calling toLowerCase
    const name = el.name ? el.name.toLowerCase() : "";
    const father = el.father ? el.father.toLowerCase() : "";
    const age = el.age ? el.age.toLowerCase() : "";
    const className = el.class ? el.class.toLowerCase() : "";
    const roll = el.roll ? el.class.toLowerCase() : "";

    return (
      name.includes(searchQuery) ||
      father.includes(searchQuery) ||
       age.includes(searchQuery) ||
      className.includes(searchQuery)||
      roll.includes(searchQuery)
    );
  });
  

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


      <button className="btn btn-add" onClick={() => setAddSection(true)}>
        Enroll Student
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
            {filteredDataList.length > 0 ? (
              filteredDataList.map((el) => (
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
                    <button className="btn btn-edit" onClick={() => handleEdit(el)}>
                      <MdModeEdit />
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>
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
    </div>
  );
};

export default Student;





























// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// // import "../components/Student.jsx";
// import "../app.css";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// import Formtable from "./formtable";
// import Formedit from "./Formedit";
// import { FaEye } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";


// axios.defaults.baseURL = "http://localhost:3000/";



// const Student = () => {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     father:"",
//     age:"",
//     class:"",
//     email: "",
//     mobile: "",
//     aadhar:"",
//     address:"",
//     _id:""
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     father:"",
//     age:"",
//     class:"",
//     email: "",
//     mobile: "",
//     aadhar:"",
//     address:"",
   
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
//       console.error("Error during submission:", error.response ? error.response.data : error.message);
//       alert("There was an error submitting the form. Please try again.");
//     }
//   };
  

//   const getFetchData = async () => {
//     try {
//       console.log('Fetching data from /getinfo');
//       const data = await axios.get("/getinfo");
//       console.log('Data received:', data);
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
//       const response = await axios.put(`/updateinfo/${formDataEdit._id}`, formDataEdit);
//       if (response.data.success) {
//         getFetchData();
//         alert(response.data.message);
//         setEditSection(false);
//       }
//     } catch (error) {
//       console.error("Error during update:", error.response ? error.response.data : error.message);
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
//       father:el.father,
//       age:el.age,
//       class:el.class,
//       email: el.email,
//       mobile: el.mobile,
//       aadhar:el.aadhar,
//       address:el.address,
//     });
//     setEditSection(true);
//   };
  

//     return (
//       <div className="container">
//         <button className="btn btn-add" onClick={() => setAddSection(true)}>
//           Enroll Student
//         </button>
//         {addSection && (
//           <Formtable
//             handlesubmit={handlesubmit}
//             handleOnChange={handleOnChange}
//             handleclose={() => setAddSection(false)}
//             rest={formData}
//           />
//         )}
//         {editSection && (
//           <Formedit
//             handlesubmit={handleUpdate}
//             handleOnChange={handleEditOnChange}
//             handleclose={() => setEditSection(false)}
//             rest={formDataEdit}
//           />
//         )}
  
//         <div className="tableContainer">
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Father</th>
//                 <th>DOB</th>
//                 <th>class</th>
//                 {/* <th>Email</th>
//                 <th>Mobile</th>
//                 <th>Aadhar</th>
//                 <th>Address</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataList.length > 0 ? (
//                 dataList.map((el) => (
//                   <tr key={el._id}>
//                     <td>{el.name}</td>
//                     <td>{el.father}</td>
//                     <td>{el.age}</td>
//                     <td>{el.class}</td>
//                     {/* <td>{el.email}</td>
//                     <td>{el.mobile}</td>
//                     <td>{el.aadhar}</td>
//                     <td>{el.address}</td> */}
//                     <td>
//                     <NavLink to={`view/${el._id}`}>
//                    <button
//                         className="btn btn-view"
//                         // onClick={() => handleView(el)}
//                       >
//                        <FaEye />
//                       </button>
//                    </NavLink>

//                       <button
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
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" style={{ textAlign: "center" }}>
//                     No Data
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

// export default Student;





// /* eslint-disable react/jsx-key */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// // import "../components/Student.jsx";
// import "../app.css";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// import Formtable from "./formtable";

// axios.defaults.baseURL = "http://localhost:3000/";

// const Student = () => {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     _id:""
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: "",
//     email: "",
//     mobile: "",
   
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
//       const data = await axios.post("/createinfo", formData);
//       console.log(data);
//       if (data.status) {
//         setAddSection(false);
//         alert(data.data.message);
//         getFetchData();
//       }
//     } catch (error) {
//       console.error("Error during submission:", error);
//       alert("There was an error submitting the form. Please try again.");
//     }
//   };


//   const getFetchData = async () => {
//     try {
//       const data = await axios.get("/getinfo");
//       console.log(data);
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

//   // console.log(dataList);

//   const handleDelete = async (id) => {
//     const data = await axios.delete("/deleteinfo/" + id);

//     if (data.data.success) {
//       getFetchData();
//       alert(data.data.message);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault()
//     const data = await axios.put("/updateinfo",formDataEdit);
//     if (data.data.success) {
//       getFetchData();
//       alert(data.data.message);
//       setEditSection(false)
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

//   // const handleEdit=(el)=>{
//   //   setFormDataEdit(el)
//   //   setEditSection(true)
//   // }

//   const handleEdit = (el) => {
//     setFormDataEdit({
//       _id: el._id,
//       name: el.name,
//       email: el.email,
//       mobile: el.mobile,
//     });
//     setEditSection(true);
//   };
  

//   return (
//     <div className="container">
//       <button className="btn btn-add" onClick={() => setAddSection(true)}>
//         Add
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
//         <Formtable
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
//               <th>Email</th>
//               <th>Mobile</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList[0] ? (
//               dataList.map((el) => {
//                 return (
//                   <tr>
//                     <td>{el.name}</td>
//                     <td>{el.email}</td>
//                     <td>{el.mobile}</td>
//                     <td>
//                       <button
//                         className="btn btn-edit"
//                         onClick={() => {
//                           handleEdit(el);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-delete"
//                         onClick={() => handleDelete(el._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <p style={{ textAlign: "center" }}>No Data</p>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Student;
