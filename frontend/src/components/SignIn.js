// src/components/SignIn.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../services/api';
import { UserContext } from '../context/UserContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser from UserContext

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await signInUser(formData);
      
      if (response.status === 200) {
        setUser({
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
        }); // Update the user context with the signed-in user's name
        setSuccess(true);
        setTimeout(() => navigate('/home'), 1000); // Redirect to home after a delay
      } else {
        setError('Failed to sign in. Please check your credentials.');
      }
    } catch (err) {
      setError('Incorrect username and/or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign In</h2>
      {success && <div className="alert alert-success">Sign-in successful! Redirecting...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/create-account">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
