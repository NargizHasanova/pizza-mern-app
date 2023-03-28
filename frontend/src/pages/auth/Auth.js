import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { signIn, signUp } from '../../redux/userSlice';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { LockOutlined } from "@mui/icons-material"
// import useStyles from './styles';
import "./auth.scss"

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp({ form, navigate }));
    } else {
      dispatch(signIn({ form, navigate }));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" className='auth-form'>
      <Paper elevation={3} className='paper'>
        <Avatar className='avatar'>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        {/*================ FORM ===================================================*/}
        <form className='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input className="input" name="firstName" label="First Name" handleChange={handleChange} 
                // autoFocus 
                half />
                <Input className="input" name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input
              className="input"
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email" />
            <Input
              className="input"
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword} />
            {isSignup && (
              <Input
                className="input"
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password" />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;