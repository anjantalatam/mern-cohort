import {
  AppBar,
  Button,
  GlobalStyles,
  Toolbar,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar color="default" position="static">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Course Hub
        </Typography>

        <nav>
          <Button variant="text" onClick={() => navigate('/login')}>
            Login
          </Button>

          <Button variant="text" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
