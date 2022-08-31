import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function Register() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [hataMesaj, setHataMesaj] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isDone, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((onceki) => ({
      ...onceki,
      [e.target.name]: e.target.value,
    }));
    if (username !== '' && email !== '' && password !== '') {
      setButtonDisabled(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    dispatch(register(userData));
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      setHataMesaj(message);
      setOpen(true);
    }
    if (isDone || user) {
      console.log('başarılı');
      navigate('/');
    }
    dispatch(reset());
  }, [user, isDone, isError, isLoading, message, dispatch, navigate]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container maxWidth='md'>
          <Stack spacing={8}>
            <Box>
              <Typography variant='h2'>Don't miss what's going on!</Typography>
            </Box>
            <Divider />

            <Box component='form' onSubmit={onSubmit}>
              <TextField
                fullWidth
                label='Username'
                required
                type='text'
                name='username'
                color='success'
                variant='outlined'
                value={username}
                onChange={onChange}
                margin='normal'
              />
              <TextField
                fullWidth
                label='Email'
                type='email'
                required
                name='email'
                color='success'
                value={email}
                variant='outlined'
                onChange={onChange}
                margin='normal'
              />

              <FormControl
                fullWidth
                sx={{
                  marginTop: '14px',
                  color: '#66bb6a',
                  border: '1px solid',
                  background: '#fff',
                  borderRadius: '5px',
                }}
              >
                <InputLabel htmlFor='password'>Password *</InputLabel>
                <FilledInput
                  fullWidth
                  required
                  id='password'
                  color='#66bb6a'
                  variant='outlined'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position='end' sx={{ color: '#66bb6a' }}>
                      <IconButton onClick={handleClickShowPassword} edge='end'>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography variant='overline'>
                By clicking Join, you agree to Penta's User Agreement, Privacy
                Policy, and Cookie Policy.
              </Typography>
              <Button
                variant='outlined'
                type='submit'
                fullWidth
                color='success'
                size='large'
                sx={{
                  marginTop: '25px',
                  letterSpacing: '6px',
                  height: '45px',
                  fontSize: '20px',
                  fontFamily: "font-family: 'Open Sans', sans-serif",
                  '&:hover': {
                    background: '#66bb6a',
                    color: '#fff',
                    boxShadow: 'none',
                    border: 'none',
                  },
                }}
                disabled={buttonDisabled}
              >
                Join us
              </Button>
            </Box>
          </Stack>

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
      )}
    </>
  );
}
export default Register;
