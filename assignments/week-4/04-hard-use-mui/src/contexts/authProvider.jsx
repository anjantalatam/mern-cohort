import { createContext, useEffect, useState } from 'react';
import { customAxios, setAuthInterceptor } from '../axios';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const createToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ createToken, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
