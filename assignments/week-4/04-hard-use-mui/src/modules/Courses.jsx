import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_END_POINTS } from '../utility';
import { useSnackbar } from '../contexts/snackbarProvider';
import { Box, Button } from '@mui/material';
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
        console.log(e, 'error');
        openSnackbar(e.response.data.message);
        // navigate to login
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [openSnackbar]);

  return (
    <Box>
      {loading && <>Loading...</>}
      <Button variant="contained" onClick={() => navigate('/courses/create')}>
        Create a Course
      </Button>
      {!loading && courses.map((c) => <>{c.id}</>)}
    </Box>
  );
}

export default Courses;
