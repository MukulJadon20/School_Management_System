import React, { useState } from 'react';
import axios from 'axios';

const Result = () => {
    const [subjects, setSubjects] = useState([
        { name: 'English', marks: '', maxMarks: 100 },
        { name: 'Hindi', marks: '', maxMarks: 100 },
        { name: 'Mathematics', marks: '', maxMarks: 100 },
        // Add other subjects as needed
    ]);

    const [result, setResult] = useState(null);

    const handleChange = (index, e) => {
        const newSubjects = [...subjects];
        newSubjects[index][e.target.name] = parseInt(e.target.value);
        setSubjects(newSubjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/calculate-result', { subjects });
        setResult(response.data);
    };

    return (
        <div>
            <h1>Generate Result</h1>
            <form onSubmit={handleSubmit}>
                {subjects.map((subject, index) => (
                    <div key={index}>
                        <label>{subject.name} Marks:</label>
                        <input
                            type="number"
                            name="marks"
                            value={subject.marks}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="submit">Calculate</button>
            </form>

            {result && (
                <div>
                    <h2>Total Marks: {result.totalMarks}</h2>
                    <h2>Percentage: {result.percentage}%</h2>
                </div>
            )}
        </div>
    );
};

export default Result;

