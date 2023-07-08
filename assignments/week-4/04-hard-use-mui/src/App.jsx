import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './components/RouterComponent';
import SnackbarProvider from './contexts/snackbarProvider';
import AuthProvider from './contexts/authProvider';
import RoleProvider from './contexts/roleProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <SnackbarProvider>
            <Navbar />
            <RouterComponent />
          </SnackbarProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
