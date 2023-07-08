import { useContext } from 'react';
import { AuthContext } from './authProvider';

function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}

export { useAuth };
