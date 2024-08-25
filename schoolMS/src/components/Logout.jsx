import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const [logoutMessage, setLogoutMessage] = useState("");

    useEffect(() => {
        // Perform logout logic, like clearing session or token
        localStorage.removeItem('token'); // Example: remove token from localStorage
        
        // Show confirmation message
        setLogoutMessage("Logout successful!");

        // Navigate back to the signup page after a short delay
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000); // Delay for 2 seconds to show the confirmation message

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [navigate]);

    return (
        <div>
            <h1>{logoutMessage || "Logging out..."}</h1>
        </div>
    );
}

export default Logout;











// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Logout() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Perform logout logic, like clearing session or token
//         localStorage.removeItem('token'); // Example: remove token from localStorage

//         // Navigate back to the signup page after logout
//         navigate('/');
//     }, [navigate]);

//     return (
//         <div>
//             <h1>Logging out...</h1>
//         </div>
//     );
// }

// export default Logout;