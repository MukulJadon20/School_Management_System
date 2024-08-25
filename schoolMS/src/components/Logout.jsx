import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout logic, like clearing session or token
        localStorage.removeItem('token'); // Example: remove token from localStorage

        // Navigate back to the signup page after logout
        navigate('/');
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;