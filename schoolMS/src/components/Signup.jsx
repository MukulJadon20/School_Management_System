/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./urls";

const Signup = () => {
  const [email, setEmail] = useState('');  // Initialize state variables to empty strings
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/`, { email, password })  // Assuming the correct backend route is '/register'
      .then((result) => {
        if (result.status === 200) {  // Ensure the status is 200 before navigating
          console.log("Registration successful:", result);
          alert("Signup successful!");  // Show a success message in a popup
          navigate("/login");  // Navigate to login page after successful registration
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 borde loginForm">
        <h2>Register Admin</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              value={email}  // Control the input with state
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-0"
              required  // Add required attribute for basic validation
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              value={password}  // Control the input with state
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required  // Add required attribute for basic validation
            />
          </div>
          <button className="btn btn-success w-100 rounded-0" type="submit">Signup</button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="btn btn-success w-100 rounded-0">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;














// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseUrl } from "./urls";

// const Signup = () => {
//   const [email, setEmail] = useState('');  // Initialize state variables to empty strings
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handlesubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post(`${baseUrl}/`, { email, password })  // Assuming the correct backend route is '/register'
//       .then((result) => {
//         if (result.status === 200) {  // Ensure the status is 200 before navigating
//           console.log("Registration successful:", result);
//           navigate("/login");  // Navigate to login page after successful registration
//         }
//       })
//       .catch((err) => {
//         console.error("Error during registration:", err.response ? err.response.data : err.message);
//       });
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
//       <div className="p-3 rounded w-25 borde loginForm">
//         <h2>Register Admin</h2>
//         <form onSubmit={handlesubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email:</strong>
//             </label>
//             <input
//               type="email"
//               name="email"
//               autoComplete="off"
//               placeholder="Enter Email"
//               value={email}  // Control the input with state
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control rounded-0"
//               required  // Add required attribute for basic validation
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password:</strong>
//             </label>
//             <input
//               type="password"
//               name="password"
//               autoComplete="off"
//               placeholder="Enter Password"
//               value={password}  // Control the input with state
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               required  // Add required attribute for basic validation
//             />
//           </div>
//           <button className="btn btn-success w-100 rounded-0" type="submit">Signup</button>
//         </form>
//         <p>Already Have an Account?</p>
//         <Link to="/login" className="btn btn-success w-100 rounded-0">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Signup;







