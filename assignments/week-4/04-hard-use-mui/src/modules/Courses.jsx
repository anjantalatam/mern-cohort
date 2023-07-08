import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_END_POINTS } from '../utility';
import { useSnackbar } from '../contexts/snackbarProvider';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_END_POINTS.dev}/admin/courses`, {
          headers: {
            Authorization: token,
          },
        });

        setCourses(res.data.courses ?? []);
      } catch (e) {
        openSnackbar(e.response.data.message);
        if (
          e.response.data.code === 'token_expired' ||
          e.response.data.code === 'token_missing'
        ) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [navigate, openSnackbar]);

  return (
    <Box
      sx={{ py: 8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {loading && <>Loading...</>}
      <Button variant="contained" onClick={() => navigate('/courses/create')}>
        Create a Course
      </Button>

      {!loading && (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course) => {
              return (
                <Grid item key={course.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={course.imageLink}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {course.title}
                      </Typography>
                      <Typography>{course.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button
                        size="small"
                        onClick={() =>
                          navigate('/courses/edit', { state: course })
                        }>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </Box>
  );
}

export default Courses;
