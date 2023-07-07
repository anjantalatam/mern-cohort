import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_END_POINTS } from '../utility';
import { useSnackbar } from '../contexts/snackbarProvider';

function Courses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { openSnackbar } = useSnackbar();

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
        console.log(res, 'res');
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
    <div>
      {loading && <>Loading...</>}
      {!loading && courses.map((c) => <>{c.id}</>)}
    </div>
  );
}

export default Courses;
