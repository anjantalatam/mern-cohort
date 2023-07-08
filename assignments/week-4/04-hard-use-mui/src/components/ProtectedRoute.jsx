import { useAuth } from '../contexts';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, type, redirectRoute = '/' }) {
  const { isAuthenticated, currentRole } = useAuth();

  if (
    (type === 'adminRoute' && currentRole === 'user') ||
    (type === 'userRoute' && currentRole === 'admin')
  ) {
    return <Navigate to={redirectRoute} replace />;
  }

  return isAuthenticated ? children : <Navigate to={redirectRoute} replace />;
}

export default ProtectedRoute;
