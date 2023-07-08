import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useSnackbar } from '../contexts';
import { API_END_POINTS } from '../utility';
import { customAxios } from '../axios';

function Course() {
  const { state: course } = useLocation();
  const { openSnackbar } = useSnackbar();

  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';

  const navigate = useNavigate();

  function purchaseCourse() {
    const token = localStorage.getItem('token');
    const purchase = async () => {
      let url = `${API_END_POINTS.dev}/users/courses/${course.id}`;

      try {
        const res = await customAxios.post(
          url,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        openSnackbar(res.data.message);
        navigate('/my-courses');
      } catch (e) {
        openSnackbar(e.response.data.message);
      }
    };

    if (course?.id) {
      purchase();
    }
  }

  return (
    <>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${course?.imageLink})`,
          height: '300px',
        }}>
        {
          <img
            style={{ display: 'none' }}
            src={course?.imageLink}
            alt={course?.imageText}
          />
        }
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            height: '300px',
          }}
        />
      </Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Container component="main" sx={{ mt: 6, mb: 2 }} maxWidth="sm">
          <Typography variant="h3" component="h1" gutterBottom>
            {course?.title}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            {course?.description}
          </Typography>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Price: {course?.price}
          </Typography>
          {isTutor ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 5 }}
              onClick={() => navigate('/courses/edit', { state: course })}>
              Edit Course
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 5 }}
              onClick={purchaseCourse}>
              Purchase Course
            </Button>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Course;
