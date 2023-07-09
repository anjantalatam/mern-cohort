import { useAuth } from '../contexts';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, redirectRoute = '/' }) {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : <Navigate to={redirectRoute} replace />;
}

export default ProtectedRoute;
