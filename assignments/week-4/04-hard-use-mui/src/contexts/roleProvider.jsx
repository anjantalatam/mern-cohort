import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RoleContext = createContext({});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTheme = createTheme();

function RoleProvider({ children }) {
  const location = useLocation();

  const [isTutor, setIsTutor] = useState(
    location.pathname.startsWith('/tutor')
  );

  useEffect(() => {
    if (location.pathname.startsWith('/tutor')) {
      setIsTutor(true);
    } else {
      setIsTutor(false);
    }
  }, [location.pathname]);

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
