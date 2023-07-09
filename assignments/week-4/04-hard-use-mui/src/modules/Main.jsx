import { Box } from '@mui/material';

import Navbar from '../components/Navbar';
import RouterComponent from '../components/RouterComponent';

function Main() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Navbar />
      <Box
        sx={{
          flex: 1,
        }}>
        <RouterComponent />
      </Box>
    </Box>
  );
}

export default Main;
