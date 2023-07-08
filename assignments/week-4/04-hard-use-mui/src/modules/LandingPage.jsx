import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function LandingPage({ role }) {
  const isTutor = role === 'admin';

  return (
    <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
      <Typography variant="h3">
        Landing Page
        <span style={{ color: 'Red' }}>{isTutor ? ' for Tutors' : ''}</span>
      </Typography>
    </Box>
  );
}

LandingPage.propTypes = { role: PropTypes.string };

export default LandingPage;
