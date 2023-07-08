import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '.';

export const RoleContext = createContext({});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTheme = createTheme();

function RoleProvider({ children }) {
  const location = useLocation();
  const { currentRole } = useAuth();

  const [isTutor, setIsTutor] = useState(false);

  useEffect(() => {
    if (currentRole) {
      if (currentRole === 'admin') {
        setIsTutor(true);
      } else {
        setIsTutor(false);
      }
    } else if (location.pathname.startsWith('/tutor')) {
      setIsTutor(true);
    } else {
      setIsTutor(false);
    }
  }, [currentRole, location.pathname]);

  return (
    <RoleContext.Provider value={{ isTutor }}>
      <ThemeProvider theme={isTutor ? defaultTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </RoleContext.Provider>
  );
}

export default RoleProvider;
