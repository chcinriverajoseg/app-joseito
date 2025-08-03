
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    // No está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Está logueado, renderiza hijos
  return children;
}
