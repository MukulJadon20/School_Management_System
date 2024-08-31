/* eslint-disable no-unused-vars */
import React from "react";
import { Link , Outlet,useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MdDashboard } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { baseUrl } from "./urls";

const Dashboard = () => {
     const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get(`${baseUrl}/logout`)
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <Link
            to="/dashboard"
            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 fw-bolder d-none d-sm-inline">
              Admin Pannel
            </span>
          </Link>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="w-100">
              <Link
                to="/dashboard"
                className="nav-link text-white px-0 align-middle"
              >
                {/* <i className="fs-4 bi-speedometer2 ms-2"></i> */}
                <MdDashboard />
                <span className="ms-2 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/student"
                className="nav-link px-0 align-middle text-white"
              >
                {/* <i className="fs-4 bi-people ms-2"></i> */}
                <PiStudentDuotone />
                <span className="ms-2 d-none d-sm-inline">
                  Manage Student
                </span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/result"
                className="nav-link px-0 align-middle text-white"
              >
                {/* <i className="fs-4 bi-columns ms-2"></i> */}
                <FaRegAddressCard />
                <span className="ms-2 d-none d-sm-inline">Generate Result</span>
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/trackfee"
                className="nav-link px-0 align-middle text-white"
              >
                {/* <i className="fs-4 bi-person ms-2"></i> */}
                <BsGraphUp />
                <span className="ms-2 d-none d-sm-inline">Track Fees</span>
              </Link>
            </li>
            <li className="w-100" onClick={handleLogout}>
            <Link
             to="/dashboard/Logout"
                className="nav-link px-0 align-middle text-white"
              >
                {/* <i className="fs-4 bi-power ms-2"></i> */}
                <IoIosLogOut />
                <span className="ms-2 d-none d-sm-inline">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
              <h4>School Sphere</h4>
          </div>
          <Outlet />
      </div>
    </div>
  </div>
);
};


export default Dashboard;