import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useAuth, useSnackbar } from '../contexts';
import { API_END_POINTS } from '../utility';
import { customAxios } from '../axios';

function Course() {
  const { state: course } = useLocation();
  const { openSnackbar } = useSnackbar();
  const { courseId } = useParams();

  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';

  const navigate = useNavigate();

  if (courseId !== course?.id) {
    // go back to previous route
    return <Navigate to={navigate(-1)} />;
  }

  function purchaseCourse() {
    const token = localStorage.getItem('token');
    const purchase = async () => {
      let url = `/users/courses/${course.id}`;

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

        openSnackbar.success(res.data.message);
        navigate('/my-courses');
      } catch (e) {
        openSnackbar.error(e.response.data.message);
      }
    };

    if (course?.id) {
      purchase();
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
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

      <Container
        component="main"
        sx={{
          mt: 6,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        maxWidth="sm">
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
            sx={{ mt: 'auto' }}
            onClick={() => navigate('/courses/edit', { state: course })}>
            Edit Course
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 'auto' }}
            onClick={purchaseCourse}>
            Purchase Course
          </Button>
        )}
      </Container>
    </div>
  );
}

export default Course;
