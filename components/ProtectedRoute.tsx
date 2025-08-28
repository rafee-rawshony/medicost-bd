
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../data/adminData';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = getLoggedInUser();

  if (!user) {
    // User not authenticated, redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
