import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { RoleContext } from './roleProvider';

function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}

function useGetRole() {
  const roleContext = useContext(RoleContext);
  return roleContext;
}

export { useAuth, useGetRole };
