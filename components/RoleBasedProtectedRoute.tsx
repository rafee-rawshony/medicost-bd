
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../data/adminData';
import type { UserRole } from '../types';

interface RoleBasedProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: UserRole[];
}

const RoleBasedProtectedRoute: React.FC<RoleBasedProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = getLoggedInUser();

  if (!user) {
    // This should be handled by the parent ProtectedRoute, but serves as a fallback.
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the required role.
    // Show an alert and redirect them to their main dashboard.
    alert('Access Denied: You do not have permission to view this page.');
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default RoleBasedProtectedRoute;