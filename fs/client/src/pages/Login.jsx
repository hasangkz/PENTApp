import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

function Login() {
  const [open, setOpen] = useState(false);
  const [hataMesaj, setHataMesaj] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isDone, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((onceki) => ({
      ...onceki,
      [e.target.name]: e.target.value,
    }));
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      setHataMesaj(message);
      setOpen(true);
    }
    if (isDone || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isDone, isError, isLoading, message, dispatch, navigate]);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <Container maxWidth='md'>
      <Stack spacing={8}>
        <Box>
          <Typography variant='h3'>Sign in</Typography>
          <Typography variant='p'>Listen to what people are saying!</Typography>
        </Box>
        <Divider />

        <Box component='form' onSubmit={onSubmit}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            required
            name='email'
            value={email}
            onChange={onChange}
            margin='normal'
          />

          <TextField
            fullWidth
            label='Password'
            type='password'
            required
            name='password'
            value={password}
            onChange={onChange}
            margin='normal'
          />

          <Button
            variant='contained'
            type='submit'
            color='primary'
            fullWidth
            size='medium'
            disabled={!email || !password}
            sx={{
              marginTop: '25px',
              height: '45px',
              fontSize: '20px',
              fontFamily: "font-family: 'Open Sans', sans-serif",
              marginBottom: '40px',
              letterSpacing: '6px',
              '&:hover': {
                background: '#fff',
                color: '#1976D2',
                boxShadow: 'none',
                border: '2px solid #1976D2',
              },
            }}
          >
            Sign in
          </Button>
        </Box>
      </Stack>
      <div>
        <a className='registere' href='/register'>
          Aren't you one of us?
        </a>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='error'>
          {hataMesaj}
          <IconButton
            size='medium'
            aria-label='close'
            color='inherit'
            sx={{ marginTop: '-12px' }}
            onClick={closeSnackbar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
