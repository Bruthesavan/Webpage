import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
