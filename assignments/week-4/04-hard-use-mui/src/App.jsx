import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';
import { SnackbarProvider } from './contexts/snackbarProvider';

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          <Navbar />
          <RouterComponent />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
