import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from './urls';

const ResultGenerate = () => {
  const { id } = useParams(); // To get student ID from the URL
  const [student, setStudent] = useState({
    name: '',
    roll: '',
    class: '',
    marks: {
      english: 0,
      hindi: 0,
      mathematics: 0,
      science: 0,
      socialScience: 0,
    },
  });

  useEffect(() => {
    // Fetch student data by ID
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getinfo/${id}`);
        if (response.data.success) {
          const studentData = response.data.data;
          setStudent({
            name: studentData.name,
            roll: studentData.roll,
            class: studentData.class,
            marks: {
              english: studentData.english || 0,
              hindi: studentData.hindi || 0,
              mathematics: studentData.mathematics || 0,
              science: studentData.science || 0,
              socialScience: studentData.socialScience || 0,
            },
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudentData();
  }, [id]);

  const handleInputChange = (subject, value) => {
    setStudent({
      ...student,
      marks: {
        ...student.marks,
        [subject]: Number(value),
      },
    });
  };

  const handleSaveResult = async () => {
    try {
      const resultData = {
        roll: student.roll,
        name: student.name,
        class: student.class,
        marks: calculateTotal(), // Save the total marks
      };
  
      // Log the data being sent to the server
      console.log("Sending result data:", resultData);
  
      const response = await axios.post(`${baseUrl}/createinfo`, resultData);
      console.log('Result saved:', response.data);
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };
  

  const calculateTotal = () => {
    const { english, hindi, mathematics, science, socialScience } = student.marks;
    return english + hindi + mathematics + science + socialScience;
  };

  const calculatePercentage = () => {
    return (calculateTotal() / 5).toFixed(2);
  };

  return (
    <div className="result-template">
      <h2>Student Result</h2>
      <div className="student-details">
        <p>Name: {student.name}</p>
        <p>Roll Number: {student.roll}</p>
        <p>Class: {student.class}</p>
      </div>
      <div className="marks-input">
        {['english', 'hindi', 'mathematics', 'science', 'socialScience'].map((subject) => (
          <label key={subject}>
            {subject.charAt(0).toUpperCase() + subject.slice(1)}:{' '}
            <input
              type="number"
              value={student.marks[subject]}
              onChange={(e) => handleInputChange(subject, e.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="result-display">
        <p>Total Marks: {calculateTotal()}</p>
        <p>Percentage: {calculatePercentage()}%</p>
      </div>
      <button onClick={handleSaveResult}>Save Result</button>
    </div>
  );
};

export default ResultGenerate;








// /* eslint-disable no-undef */
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ResultGenerate = () => {
//   const { id } = useParams(); // To get student ID from the URL
//   const [student, setStudent] = useState({
//     name: '',
//     rollNumber: '',
//     class: '',
//     marks: {
//       english: 0,
//       hindi: 0,
//       mathematics: 0,
//       science: 0,
//       socialScience: 0,
//     },
//   });

//   useEffect(() => {
//     // Fetch student data by ID
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get(`student/${id}`);
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };
//     fetchStudentData();
//   }, [id]);

//   const handleInputChange = (subject, value) => {
//     setStudent({
//       ...student,
//       marks: {
//         ...student.marks,
//         [subject]: Number(value),
//       },
//     });
//   };

//   const handleSaveResult = async () => {
//     try {
//       const resultData = {
//         rollNumber,
//         name,
//         class: studentClass,
//         marks: {
//           english: englishMarks,
//           hindi: hindiMarks,
//           mathematics: mathematicsMarks,
//           science: scienceMarks,
//           socialScience: socialScienceMarks
//         }
//       };
  
//       // Log the data being sent to the server
//       console.log("Sending result data:", resultData);
  
//       const response = await axios.post('http://localhost:3000/api/student/result', resultData);
//       console.log('Result saved:', response.data);
//     } catch (error) {
//       console.error('Error saving result:', error);
//     }
//   };
  

//   const calculateTotal = () => {
//     const { english, hindi, mathematics, science, socialScience } = student.marks;
//     return english + hindi + mathematics + science + socialScience;
//   };

//   const calculatePercentage = () => {
//     return (calculateTotal() / 5).toFixed(2);
//   };

//   return (
//     <div className="result-template">
//       <h2>Student Result</h2>
//       <div className="student-details">
//         <p>Name: {student.name}</p>
//         <p>Roll Number: {student.rollNumber}</p>
//         <p>Class: {student.class}</p>
//       </div>
//       <div className="marks-input">
//         {['english', 'hindi', 'mathematics', 'science', 'socialScience'].map((subject) => (
//           <label key={subject}>
//             {subject.charAt(0).toUpperCase() + subject.slice(1)}:{' '}
//             <input
//               type="number"
//               value={student.marks[subject]}
//               onChange={(e) => handleInputChange(subject, e.target.value)}
//             />
//           </label>
//         ))}
//       </div>
//       <div className="result-display">
//         <p>Total Marks: {calculateTotal()}</p>
//         <p>Percentage: {calculatePercentage()}%</p>
//       </div>
//       <button onClick={handleSaveResult}>Save Result</button>
//     </div>
//   );
// };

// export default ResultGenerate;

