import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <RouterComponent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
