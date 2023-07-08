import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';
import { SnackbarProvider } from './contexts/snackbarProvider';
import AuthProvider from './contexts/authProvider';
import RoleProvider from './contexts/roleProvider';

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <AuthProvider>
          <SnackbarProvider>
            <Navbar />
            <RouterComponent />
          </SnackbarProvider>
        </AuthProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;
