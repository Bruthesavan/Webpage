import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Update imports

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />} // Update element
    />
  );
};

export default PrivateRoute;
