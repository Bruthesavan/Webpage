// frontend/src/components/SignupForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';


const SignupForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', formData);

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
