import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';
import { SnackbarProvider } from './contexts/snackbarProvider';
import AuthProvider from './contexts/authProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider>
          <BrowserRouter>
            <Navbar />
            <RouterComponent />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
