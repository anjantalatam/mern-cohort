import { Box, Button, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts';
import { useNavigate } from 'react-router-dom';

function LandingPage({ role }) {
  const { isAuthenticated } = useAuth();
  const isTutor = role === 'admin';
  const navigate = useNavigate();

  const image = isTutor
    ? 'https://images.pexels.com/photos/6325954/pexels-photo-6325954.jpeg'
    : 'https://images.pexels.com/photos/6958516/pexels-photo-6958516.jpeg';

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
        display: 'flex',
        justifyContent: 'center',
      }}>
      {<img style={{ display: 'none' }} src={image} alt={'Love to learn'} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Paper
          sx={{
            background: 'white',
            opacity: '0.9',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            m: 4,
            borderRadius: '1rem',
          }}>
          <Typography
            variant="h4"
            color="inherit"
            paragraph
            style={{ textAlign: 'center' }}>
            {isTutor ? (
              <>
                <span style={{ color: 'red' }}>Inspire</span> the Next
                Generation of Learners
              </>
            ) : (
              <>
                <span style={{ color: 'red' }}>Unlock</span> Your Learning
                Journey Today
              </>
            )}
          </Typography>
          {!isAuthenticated && (
            <Button
              sx={{ mt: 3 }}
              onClick={() => navigate(isTutor ? '/tutor/signup' : '/signup')}
              variant="contained">
              {isTutor ? 'Become a Tutor' : 'Start Learning'}
            </Button>
          )}
          {isAuthenticated && (
            <Button
              sx={{ mt: 3 }}
              onClick={() => navigate(isTutor ? '/courses' : '/my-courses')}
              variant="contained">
              {isTutor ? 'Go to Courses' : 'Go to My Courses'}
            </Button>
          )}
        </Paper>
      </Box>
    </Paper>
  );
}

LandingPage.propTypes = { role: PropTypes.string };

export default LandingPage;
