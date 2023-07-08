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

import { API_END_POINTS } from '../utility';
import Password from '../components/Password';
import { customAxios } from '../axios';
import { useSnackbar } from '../contexts/snackbarProvider';
import { useAuth } from '../contexts';

function Signup() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { createToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const res = await customAxios.post(`${API_END_POINTS.dev}/admin/signup`, {
        username: data.get('email'),
        password: data.get('password'),
      });
      openSnackbar(res.data.message);
      createToken(res.data.token);
      navigate('/courses');
    } catch (e) {
      openSnackbar(e.response.data.message);
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
          Sign up
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
            Sign up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link onClick={() => navigate('/login')} variant="body2">
                {'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
