// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error); // Log the Axios error
        setError('Error fetching profile.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Display other profile information as needed */}
    </div>
  );
};

export default Profile;
