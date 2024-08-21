/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "../app.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handlesubmit,handleOnChange,handleclose}) => {
  return (
    <div className="addcontainer">
    <form onSubmit={handlesubmit}>
      <div className="close-btn" onClick={handleclose}>
        <MdClose />
      </div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleOnChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={handleOnChange}
      />

      <label htmlFor="mobile">Mobile:</label>
      <input
        type="number"
        id="mobile"
        name="mobile"
        onChange={handleOnChange}
      />

      <button className="btn">Submit</button>
    </form>
  </div>
  )
}

export default Formtable
