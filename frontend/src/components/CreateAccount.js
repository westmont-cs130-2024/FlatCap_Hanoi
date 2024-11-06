// src/components/CreateAccount.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    first_name: '',   // Change to snake_case
    last_name: '',    // Change to snake_case
    email: '',
    phone_number: '', // Change to snake_case
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      if (response.status === 201) {
        navigate('/sign-in'); // Redirect to sign-in on successful account creation
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
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
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
