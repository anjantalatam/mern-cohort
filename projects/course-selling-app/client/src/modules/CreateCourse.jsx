import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { API_END_POINTS, FALL_BACK_ERROR_MESSAGE } from '../utility';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useState } from 'react';
import { useSnackbar } from '../contexts';

import { useLocation, useNavigate } from 'react-router-dom';
import { customAxios } from '../axios';

function CreateCourse({ mode }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isEditMode = mode === 'edit';

  const [courseDetails, setCourseDetails] = useState({
    title: state?.title ?? '',
    description: state?.description ?? '',
    price: state?.price ?? '',
    imageLink: state?.imageLink ?? '',
    published: state?.published ?? false,
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

    const reqBody = {
      title: data.get('title'),
      description: data.get('description'),
      price: Number(data.get('price')),
      imageLink: data.get('imageLink'),
      published: isEditMode ? data.get('published') : true,
    };

    let url = `/admin/courses`;

    if (isEditMode) {
      url = `${url}/${state.id}`;
    }

    try {
      const res = await customAxios({
        method: isEditMode ? 'put' : 'post',
        url: url,
        data: reqBody,
        headers: {
          Authorization: token,
        },
      });

      if (res) {
        openSnackbar.success(res.data.message);
        navigate('/courses');
      }
    } catch (e) {
      openSnackbar.error(e?.response?.data?.message ?? FALL_BACK_ERROR_MESSAGE);
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
          <CreateNewFolderIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isEditMode ? 'Edit Course' : 'Create Course'}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          onChange={handleChange}>
          <TextField
            value={courseDetails.title}
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
            value={courseDetails.description}
            margin="normal"
            required
            fullWidth
            label="Description"
            autoComplete="description"
            type="text"
            multiline
            rows={4}
          />

          <TextField
            name="price"
            value={courseDetails.price}
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
            value={courseDetails.imageLink}
            margin="normal"
            required
            fullWidth
            label="Image Link"
            autoComplete="imageLink"
            type="text"
          />
          {isEditMode && (
            <FormControl required margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Course Status
              </InputLabel>
              <Select
                name="published"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={courseDetails.published}
                label="Course Status"
                onChange={handleChange}>
                <MenuItem value={true}>Visible</MenuItem>
                <MenuItem value={false}>Hidden</MenuItem>
              </Select>
            </FormControl>
          )}

          {!isEditMode && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Object.values(error).some((value) => !!value)}>
              Create
            </Button>
          )}

          {isEditMode && (
            <Box display="flex" gap="1rem" alignItems="center">
              <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate(-1)}
                disabled={Object.values(error).some((value) => !!value)}>
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                disabled={Object.values(error).some((value) => !!value)}>
                Save Changes
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default CreateCourse;
