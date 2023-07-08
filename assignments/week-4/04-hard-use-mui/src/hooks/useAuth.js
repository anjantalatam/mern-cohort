import { useState, useEffect } from 'react';
import { customAxios, setAuthInterceptor } from '../axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    };

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

  return { isAuthenticated };
};

export default useAuth;
