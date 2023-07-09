import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { RoleContext } from './roleProvider';
import { SnackbarContext } from './snackbarProvider';

function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}

function useGetRole() {
  const roleContext = useContext(RoleContext);
  return roleContext;
}

function useSnackbar() {
  const context = useContext(SnackbarContext);

  return context;
}

export { useAuth, useGetRole, useSnackbar };
