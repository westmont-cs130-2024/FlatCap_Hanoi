// src/components/AccountPage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from './Header'; // Import the Header component

const AccountPage = () => {
    const { user, setUser } = useContext(UserContext); // Access user data and the method to update user context
    const navigate = useNavigate(); // React Router navigation

    // Logout handler
    const handleLogout = () => {
        // Clear user context
        setUser(null);

        // Redirect to login page
        navigate('/sign-in');
    };

    return (
        <>
            {/* Include Header at the top */}
            <Header />

            <div className="container mt-5">
                <h2>Account Details</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {user?.first_name} {user?.last_name}
                        </h5>
                        <p className="card-text">
                            Email: {user?.email || 'No email available'}
                        </p>
                        {/* Add other account-related details here */}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    className="btn btn-danger mt-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </>
    );
};

export default AccountPage;