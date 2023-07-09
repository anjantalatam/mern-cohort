import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts';

function BaseRoute({ children, type }) {
  const { currentRole } = useAuth();

  if (type === 'tutor') {
    if (currentRole === 'user') {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (currentRole === 'admin') {
    return <Navigate to="/tutor" replace />;
  } else if (currentRole === 'user') {
    return children;
  }

  return children;
}

export default BaseRoute;
