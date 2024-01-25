import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token in localStorage
        navigate('/profile');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
