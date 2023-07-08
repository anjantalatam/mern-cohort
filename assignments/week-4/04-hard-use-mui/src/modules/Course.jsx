import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function Course() {
  const { state: course } = useLocation();

  const navigate = useNavigate();

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
            src={course.image}
            alt={course.imageText}
          />
        }
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
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
            {course.title}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            {course.description}
          </Typography>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Price: {course.price}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 5 }}
            onClick={() => navigate('/courses/edit', { state: course })}>
            Edit Course
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Course;
