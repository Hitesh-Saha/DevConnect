import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" replace />
};

export default PrivateRoute;
