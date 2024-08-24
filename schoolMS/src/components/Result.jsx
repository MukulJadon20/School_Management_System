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
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoPrintSharp } from "react-icons/io5";
import { FaPrint } from "react-icons/fa";

axios.defaults.baseURL = "http://localhost:3000/";

const Result = () => {
  const navigate = useNavigate(); // Initialize useNavigate
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
    english: "",
    hindi: "",
    mathematics: "",
    science: "",
    roll: "",
    yellow: "",
    marks: "",
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
    english: "",
    hindi: "",
    mathematics: "",
    science: "",
    roll: "",
    yellow: "",
    marks: "",
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
      mode: el.mode,
      english: el.english,
      hindi: el.hindi,
      mathematics: el.mathematics,
      science: el.science,
      roll: el.roll,
      yellow: el.yellow,
      marks: el.marks,
    });
    setEditSection(true);
  };

  const handleGenerateResult = (el) => {
    // Navigate to the Result page with student ID
    navigate(`resultgenerate/${el._id}`);
  };

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
              <th>Roll No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.roll}</td>
                  <td>{el.name}</td>
                  <td>{el.class}</td>
                  <td>{el.marks}</td> {/* Display total marks */}
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
                      className="btn btn-generate"
                      onClick={() => handleGenerateResult(el)}
                    >
                      <FaPrint /> Result
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

export default Result;
