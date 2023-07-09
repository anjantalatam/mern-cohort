import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Password from '../components/Password';
import { API_END_POINTS } from '../utility';
import { useSnackbar } from '../contexts';

import { customAxios } from '../axios';
import { useAuth } from '../contexts';
import PropTypes from 'prop-types';
function Login({ role }) {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { createToken } = useAuth();
  const isTutor = role === 'admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      let url = `/users/login`;

      if (isTutor) {
        url = `/admin/login`;
      }
      const res = await customAxios.post(
        url,
        {},
        {
          headers: {
            username: data.get('email'),
            password: data.get('password'),
          },
        }
      );

      openSnackbar.success(res.data.message);
      createToken(res.data.token, res.data.role);
      navigate('/courses');
    } catch (e) {
      openSnackbar.error(e.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isTutor ? 'Tutor Login' : 'Login'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            name="email"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            type="email"
          />

          <Password />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                onClick={() => navigate(isTutor ? '/tutor/signup' : '/signup')}
                variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

Login.propTypes = {
  role: PropTypes.string,
};
export default Login;
