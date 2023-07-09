import { createContext, useEffect, useState } from 'react';
import { customAxios, setAuthInterceptor } from '../axios';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [currentRole, setCurrentRole] = useState(localStorage.getItem('role'));

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);

    localStorage.removeItem('role');
    setCurrentRole(null);
  };

  const createToken = (token, role) => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setIsAuthenticated(true);
      setCurrentRole(role);
    }
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
    setAuthInterceptor(logout);

    return () => {
      customAxios.interceptors.response.eject();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ createToken, isAuthenticated, currentRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
