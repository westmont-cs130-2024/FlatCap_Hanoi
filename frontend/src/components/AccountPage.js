import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from './Header';

const AccountPage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    setUser(null); // Clear user context
    navigate('/sign-in'); // Redirect to sign-in page
  };

  return (
    <>
      

      <div className="container mt-5">
      <Header />
        <div className="text-center mb-4">
          <h1 className="display-4">Your Account</h1>
          <p className="text-muted">View and manage your account details here.</p>
        </div>

        {/* Account Details Section */}
        <div className="p-4 bg-light rounded shadow">
          <h5 className="text-primary mb-3">Account Details</h5>
          {user ? (
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Name:</strong>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Email:</strong>
                <span>{user.email || 'No email available'}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Phone Number:</strong>
                <span>{user.phone_number || 'No phone number available'}</span>
              </li>
            </ul>
          ) : (
            <div className="alert alert-warning text-center" role="alert">
              No account information available. Please sign in.
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="text-center mt-4">
          <button
            className="btn btn-danger btn-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountPage;