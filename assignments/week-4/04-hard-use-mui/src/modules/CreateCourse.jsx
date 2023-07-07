import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { API_END_POINTS, FALL_BACK_ERROR_MESSAGE } from '../utility';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useState } from 'react';
import { useSnackbar } from '../contexts/snackbarProvider';

function CreateCourse() {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    price: '',
    imageLink: '',
  });

  const [error, setError] = useState({ price: null });

  const { openSnackbar } = useSnackbar();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'price') {
      if (isNaN(Number(value))) {
        setError({ price: 'Invalid price' });
      } else if (Number(value) < 0) {
        setError({ price: "Price can't be less than 0" });
      } else {
        setError({
          price: null,
        });
      }
    }

    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${API_END_POINTS.dev}/admin/courses`,
        {
          title: data.get('title'),
          description: data.get('description'),
          price: Number(data.get('price')),
          imageLink: data.get('imageLink'),
          published: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res) {
        openSnackbar(res.data.message);
      }
      console.log(res, 'res');
    } catch (e) {
      openSnackbar(e?.response?.data?.message ?? FALL_BACK_ERROR_MESSAGE);
    }

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
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
          <CreateNewFolderIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Course
        </Typography>
        <FormControl error={true}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            onChange={handleChange}>
            <TextField
              name="title"
              margin="normal"
              required
              fullWidth
              label="Title"
              autoComplete="title"
              autoFocus
              type="text"
            />

            <TextField
              name="description"
              margin="normal"
              required
              fullWidth
              label="Description"
              autoComplete="description"
              type="text"
            />

            <TextField
              name="price"
              margin="normal"
              required
              fullWidth
              label="Price"
              autoComplete="price"
              type="number"
              error={!!error?.price}
              color={error?.price ? 'error' : 'primary'}
              helperText={error?.price || null}
            />

            <TextField
              name="imageLink"
              margin="normal"
              required
              fullWidth
              label="Image Link"
              autoComplete="imageLink"
              type="text"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Object.values(error).some((value) => !!value)}>
              Create
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}

export default CreateCourse;
