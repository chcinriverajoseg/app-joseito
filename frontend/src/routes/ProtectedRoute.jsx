import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    // Si no está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza la ruta protegida
  return children;
}

