import { BrowserRouter } from 'react-router-dom';
import SnackbarProvider from './contexts/snackbarProvider';
import AuthProvider from './contexts/authProvider';
import RoleProvider from './contexts/roleProvider';
import Main from './modules/Main';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <SnackbarProvider>
            <Main />
          </SnackbarProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
