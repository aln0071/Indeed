/*
eslint
react/jsx-props-no-spreading: 0,
jsx-a11y/anchor-is-valid: 0,
jsx-a11y/label-has-associated-control: 0
*/
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '../styles.scss';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Indeed
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme} className={styles.login}>
      <Container
        component="main"
        maxWidth="xs"
        className={styles.loginContainer}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box className={styles.loginBody}>
            <Typography
              component="h1"
              variant="h5"
              className={styles.loginHeader}
            >
              Sign in
            </Typography>
            <p className={styles.loginPolicy}>
              By signing in to your account, you agree to Indeed&#39;s
              {' '}
              <a href="#">Terms of Service</a>
              {' '}
              and consent to our
              {' '}
              <a href="#">Cookie Policy</a>
              {' '}
              and
              <a href="#">Privacy Policy</a>
              .
            </p>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className={styles.loginInput}>
                <label>Email Address</label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <div className={styles.loginInput}>
                <label>Password</label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Keep me signed in on this device."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div className={styles.loginCentered}>
                <Link href="#" variant="body2">
                  New to Indeed? Create an account
                </Link>
              </div>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" align="center">
          <Link href="#" variant="body2">
            Forgot Your password?
          </Link>
          <br />
          <br />
          <Link href="#" variant="body2">
            Help Center
          </Link>
        </Typography>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
