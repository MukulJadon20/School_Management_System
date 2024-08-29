/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AdminTable from './AdminTable';
import { baseUrl } from './urls';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState({
    email: "",
    _id: ""
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    adminCount();
    studentCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get(`${baseUrl}/adminrecords`)
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          console.error("Error fetching admin records:", result.data.Message);
        }
      })
      .catch(error => {
        console.error("Error fetching admin records:", error);
      });
  };

  const adminCount = () => {
    axios.get(`${baseUrl}/admincount`)
      .then(result => {
        if (result.data && typeof result.data.count === 'number') {
          setAdminTotal(result.data.count);
        } else {
          console.error("Unexpected response structure:", result.data);
        }
      })
      .catch(error => {
        console.error("Error fetching admin count:", error);
      });
  };

  const studentCount = () => {
    axios.get(`${baseUrl}/studentcount`)
      .then(result => {
        if (result.data && typeof result.data.count === 'number') {
          setStudentTotal(result.data.count);
        } else {
          console.error("Unexpected response structure:", result.data);
        }
      })
      .catch(error => {
        console.error("Error fetching student count:", error);
      });
  };

  // Handle Edit function
  const handleEdit = (admin) => {
    setFormDataEdit({
      email: admin.email,
      _id: admin._id
    });
    setEditSection(true);
  };

  // Show the custom delete confirmation modal
  const handleDelete = (id) => {
    setAdminToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (adminToDelete) {
      axios.delete(`${baseUrl}/deleteadmin/${adminToDelete}`)
        .then(response => {
          if (response.data.Status) {
            setAdmins(admins.filter(admin => admin._id !== adminToDelete));
            setShowDeleteModal(false);
          } else {
            console.error("Error deleting admin:", response.data.Message);
          }
        })
        .catch(error => {
          console.error("Error deleting admin:", error);
        });
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAdminToDelete(null);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...dataToSend } = formDataEdit;

      // Ensure all fields are initialized to avoid the uncontrolled to controlled warning
      const updatedData = {
        name: dataToSend.name || '',
        email: dataToSend.email || '',
      };

      const response = await axios.put(`/updateadmin/${_id}`, updatedData);
      if (response.status === 200) {
        setEditSection(false);
        setShowSuccessMessage(true); // Show the success message
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the success message after 3 seconds
        AdminRecords(); // Refresh the admin records after updating
      }
    } catch (error) {
      console.error("Error during update:", error.response ? error.response.data : error.message);
      alert("There was an error updating the data. Please try again.");
    }
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Students</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {studentTotal}</h5>
          </div>
        </div>
      </div>

      {addSection && (
        <AdminTable
          // Pass necessary props for adding a new admin
          handleclose={() => setAddSection(false)}
          // other props
        />
      )}
      {editSection && (
        <AdminTable
          handlesubmit={handleUpdate}
          handleOnChange={handleOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.email}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(admin)}>
                    <MdModeEdit />
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(admin._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSuccessMessage && (
        <div className="alert alert-success" style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: '1000' }}>
          <IoCheckmarkDoneCircle />Admin updated successfully!
        </div>
      )}

{showDeleteModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h4>Are you sure you want to delete this admin?</h4>
            <div className="d-flex justify-content-around mt-4">
              <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
              <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;


// Styles for modal
const modalStyles = {
  // position: 'fixed',
  // top: 0,
  // left: 0,
  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxwidth: '20%',
  maxheight: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};







// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MdModeEdit, MdDelete } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import AdminTable from './AdminTable';
// import { baseUrl } from './urls';

// const Home = () => {
//   const [adminTotal, setAdminTotal] = useState(0);
//   const [studentTotal, setStudentTotal] = useState(0);
//   const [admins, setAdmins] = useState([]);
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formDataEdit, setFormDataEdit] = useState({
//     email: "",
//     _id: ""
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     adminCount();
//     studentCount();
//     AdminRecords();
//   }, []);

//   const AdminRecords = () => {
//     axios.get(`${baseUrl}/adminrecords`)
//       .then(result => {
//         if (result.data.Status) {
//           setAdmins(result.data.Result);
//         } else {
//           console.error("Error fetching admin records:", result.data.Message);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin records:", error);
//       });
//   };

//   const adminCount = () => {
//     axios.get(`${baseUrl}/admincount`)
//       .then(result => {
//         if (result.data && typeof result.data.count === 'number') {
//           setAdminTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin count:", error);
//       });
//   };

//   const studentCount = () => {
//     axios.get(`${baseUrl}/studentcount`)
//       .then(result => {
//         if (result.data && typeof result.data.count === 'number') {
//           setStudentTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching student count:", error);
//       });
//   };

//   // Handle Edit function
//   const handleEdit = (admin) => {
//     setFormDataEdit({
//       email: admin.email,
//       _id: admin._id
//     });
//     setEditSection(true);
//   };

//   // Handle Delete function
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       axios.delete(`${baseUrl}/deleteadmin/${id}`)
//         .then(response => {
//           if (response.data.Status) {
//             // Remove the deleted admin from the state
//             setAdmins(admins.filter(admin => admin._id !== id));
//           } else {
//             console.error("Error deleting admin:", response.data.Message);
//           }
//         })
//         .catch(error => {
//           console.error("Error deleting admin:", error);
//         });
//     }
//   };

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setFormDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { _id, ...dataToSend } = formDataEdit;
  
//       // Ensure all fields are initialized to avoid the uncontrolled to controlled warning
//       const updatedData = {
//         name: dataToSend.name || '',
//         email: dataToSend.email || '',
//         // Add other fields here
//         // Example: role: dataToSend.role || ''
//       };
  
//       const response = await axios.put(`/updateadmin/${_id}`, updatedData);
//       if (response.status === 200) {
//         setEditSection(false);
//         alert(response.data.Message); // Use Message from the backend response
//         AdminRecords(); // Refresh the admin records after updating
//       }
//     } catch (error) {
//       console.error("Error during update:", error.response ? error.response.data : error.message);
//       alert("There was an error updating the data. Please try again.");
//     }
//   };
  

//   return (
//     <div>
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Admin</h4>
//           </div>
//           <hr />
//           <div>
//             <h5>Total: {adminTotal}</h5>
//           </div>
//         </div>
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Students</h4>
//           </div>
//           <hr />
//           <div>
//             <h5>Total: {studentTotal}</h5>
//           </div>
//         </div>
//       </div>

     
//       {addSection && (
//         <AdminTable
//           // Pass necessary props for adding a new admin
//           handleclose={() => setAddSection(false)}
//           // other props
//         />
//       )}
//       {editSection && (
//         <AdminTable
//           handlesubmit={handleUpdate}
//           handleOnChange={handleOnChange}
//           handleclose={() => setEditSection(false)}
//           rest={formDataEdit}
//         />
//       )}

//       <div className="mt-4 px-5 pt-3">
//         <h3>List of Admins</h3>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin, index) => (
//               <tr key={index}>
//                 <td>{admin.email}</td>
//                 <td>
//                   <button className="btn btn-edit" onClick={() => handleEdit(admin)}>
//                     <MdModeEdit />
//                   </button>
//                   <button className="btn btn-delete" onClick={() => handleDelete(admin._id)}>
//                     <MdDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;




























// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { MdModeEdit, MdDelete, MdClose } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [adminTotal, setAdminTotal] = useState(0); 
//   const [studentTotal, setStudentTotal] = useState(0);
//   const [admins, setAdmins] = useState([]);

//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   useEffect(() => {
//     adminCount();
//     studentCount();
//     AdminRecords();
//   }, []);

//   const AdminRecords = () => {
//     axios.get('http://localhost:3000/adminrecords')
//       .then(result => {
//         if (result.data.Status) {
//           setAdmins(result.data.Result);
//         } else {
//           console.error("Error fetching admin records:", result.data.Message);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin records:", error);
//       });
//   };

//   const adminCount = () => {
//     axios.get('http://localhost:3000/admincount')
//       .then(result => {
//         if (result.data && typeof result.data.count === 'number') {
//           setAdminTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin count:", error);
//       });
//   };

//   const studentCount = () => {
//     axios.get('http://localhost:3000/studentcount')
//       .then(result => {
//         if (result.data && typeof result.data.count === 'number') {
//           setStudentTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching student count:", error);
//       });
//   };

//   // Handle Edit function
//   const handleEdit = (admin) => {
//     // Navigate to AdminTable page with admin details
//     navigate('/AdminTable', { state: { admin } });
//   };


//   // Handle Delete function
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       axios.delete(`http://localhost:3000/deleteadmin/${id}`)
//         .then(response => {
//           if (response.data.Status) {
//             // Remove the deleted admin from the state
//             setAdmins(admins.filter(admin => admin._id !== id));
//           } else {
//             console.error("Error deleting admin:", response.data.Message);
//           }
//         })
//         .catch(error => {
//           console.error("Error deleting admin:", error);
//         });
//     }
//   };

//   return (
//     <div>
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Admin</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total: {adminTotal}</h5>
//           </div>
//         </div>
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Students</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total: {studentTotal}</h5>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 px-5 pt-3">
//         <h3>List of Admins</h3>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin, index) => (
//               <tr key={index}>
//                 <td>{admin.email}</td>
//                 <td>
//                   <button className="btn btn-edit" onClick={() => handleEdit(admin)}>
//                     <MdModeEdit />
//                   </button>
//                   <button className="btn btn-delete" onClick={() => handleDelete(admin._id)}>
//                     <MdDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;



// /* eslint-disable no-unused-vars */
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const Home = () => {
//   const [adminTotal, setAdminTotal] = useState(0) // Default to 0
//   const [studentTotal, setStudentTotal] = useState(0) // Default to 0
//   const [admins, setAdmins] = useState([])

//   useEffect(() => {
//     adminCount();
//     studentCount();
//     AdminRecords();
//   }, [])

//   const AdminRecords=()=>{
//     axios.get('http://localhost:3000/admin/adminrecords')
//       .then(result => {
//         if (result.data.Status) {
//           setAdmins(result.data.Result);
//         } else {
//           console.error("Error fetching admin records:", result.data.Message);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin records:", error);
//       });

//   }

//   const adminCount = () => {
//     axios.get('http://localhost:3000/admincount')
//       .then(result => {
//         // Check if response contains count property directly
//         if (result.data && typeof result.data.count === 'number') {
//           setAdminTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching admin count:", error);
//       });
//   }

//   const studentCount = () => {
//     axios.get('http://localhost:3000/studentcount')
//       .then(result => {
//         // Check if response contains count property directly
//         if (result.data && typeof result.data.count === 'number') {
//           setStudentTotal(result.data.count);
//         } else {
//           console.error("Unexpected response structure:", result.data);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching student count:", error);
//       });
//   }

//   return (
//     <div>
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Admin</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total: {adminTotal}</h5>
//           </div>
//         </div>
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//           <div className="text-center pb-1">
//             <h4>Students</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total: {studentTotal}</h5>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4 px-5 pt-3">
//         <h3>List of Admins</h3>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
// {
//   admins.map(a=>{
//     <tr>
//       <td>{a.email}</td>
//     </tr>
//   })
// }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Home;

// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const Home = () => {
//   const[adminTotal,setAdminTotal]=useState()
//   const[studentTotal,setStudentTotal]=useState()

//   useEffect(()=>{
//     adminCount();
//   },[])

//   const adminCount =()=>{
// axios.get('http://localhost:3000/admincount')
// .then(result=>{
//   if(result.data.Status){
//     setAdminTotal(result.data.Result[0].admin)
//   }
// })
//   }
//   return (
//     <div>
//       <div className="p-3 d-flex justify-content-around mt-3">
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25" >
//           <div className="text-center pb-1">
//             <h4>Admin</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total:{adminTotal}</h5>
//           </div>
//         </div>
//         <div className="px-3 pt-2 pb-3 border shadow-sm w-25 ">
//           <div className="text-center pb-1">
//             <h4>Students</h4>
//           </div>
//           <hr />
//           <div className="">
//             <h5>Total:</h5>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Home
