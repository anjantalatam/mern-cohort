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

function Courses({ type }) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { currentRole } = useAuth();

  const isTutor = currentRole === 'admin';
  const isTypePurchasedCourses = type === 'purchased-courses';

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getCourses = async () => {
      let url = `/users/courses`;
      if (isTypePurchasedCourses) {
        url = `/users/purchasedCourses`;
      }

      if (isTutor) {
        url = `/admin/courses`;
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
        openSnackbar.error(e.response.data.message);
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
  }, [isTutor, isTypePurchasedCourses, navigate, openSnackbar]);

  return (
    <Box
      sx={{ pt: 5, pb: 8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Container sx={{ py: 8, pt: 0 }} maxWidth="md">
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          sx={{ mb: 4 }}>
          <Typography variant="h4">
            {isTypePurchasedCourses ? 'My Courses' : 'Courses'}
          </Typography>
          {isTutor && (
            <Button
              variant="contained"
              onClick={() => navigate('/courses/create')}>
              Create a Course
            </Button>
          )}
        </Box>

        {loading && <>Loading...</>}

        {!loading &&
          courses.length === 0 &&
          !isTypePurchasedCourses &&
          'No Courses'}

        {!loading && courses.length == 0 && isTypePurchasedCourses && (
          <Button variant="contained" onClick={() => navigate('/courses')}>
            Buy a Course
          </Button>
        )}

        {!loading && (
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
                    {!isTypePurchasedCourses && (
                      <>
                        <Divider />
                        <CardActions
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {isTutor ? (
                            <>
                              <Button
                                size="small"
                                onClick={() =>
                                  navigate(`/courses/${course.id}`, {
                                    state: course,
                                  })
                                }>
                                View
                              </Button>
                              <Button
                                size="small"
                                onClick={() =>
                                  navigate('/courses/edit', {
                                    state: course,
                                  })
                                }>
                                Edit
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="small"
                              onClick={() =>
                                navigate(`/courses/${course.id}`, {
                                  state: course,
                                })
                              }>
                              Purchase
                            </Button>
                          )}
                        </CardActions>
                      </>
                    )}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

Courses.propTypes = { role: PropTypes.string };

export default Courses;
