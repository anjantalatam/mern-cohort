import { useEffect, useState } from 'react';
import { API_END_POINTS } from '../utility';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { customAxios } from '../axios';
import PropTypes from 'prop-types';
import { useAuth, useSnackbar } from '../contexts';

function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getCourses = async () => {
      let url = `${API_END_POINTS.dev}/users/courses`;

      if (isTutor) {
        url = `${API_END_POINTS.dev}/admin/courses`;
      }
      try {
        setLoading(true);
        const res = await customAxios.get(url, {
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
  }, [isTutor, navigate, openSnackbar]);

  return (
    <Box
      sx={{ py: 8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {loading && <>Loading...</>}
      {isTutor && (
        <Button
          variant="contained"
          onClick={() => navigate('/tutor/courses/create')}>
          Create a Course
        </Button>
      )}

      {!loading && courses.length == 0 && 'No Courses'}

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

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {course.title}
                      </Typography>
                      <Typography sx={{ mb: 3 }}>
                        {course.description}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 5,
                          marginTop: 'auto',
                          fontWeight: 600,
                        }}>
                        Price: {course.price}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {isTutor ? (
                        <>
                          <Button
                            size="small"
                            onClick={() =>
                              navigate(`/tutor/courses/${course.id}`, {
                                state: course,
                              })
                            }>
                            View
                          </Button>
                          <Button
                            size="small"
                            onClick={() =>
                              navigate('/tutor/courses/edit', { state: course })
                            }>
                            Edit
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="small"
                          onClick={() =>
                            navigate(`/courses/${course.id}`, { state: course })
                          }>
                          Purchase
                        </Button>
                      )}
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

Courses.propTypes = { role: PropTypes.string };

export default Courses;
