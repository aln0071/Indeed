/* eslint-disable linebreak-style */
/*
eslint
react/jsx-props-no-spreading: 0,
jsx-a11y/anchor-is-valid: 0,
jsx-a11y/label-has-associated-control: 0
*/
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styles from '../styles.scss';
import IndeedLogo from '../svg/indeed.svg';
import GoogleLogo from '../svg/google.svg';
import AppleLogo from '../svg/apple.svg';
import FacebookLogo from '../svg/facebook.svg';
import { loginUserAction } from '../store/actions/user';

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
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(loginUserAction(data.get('email'), data.get('password'), history));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" className={styles.loginContainer}>
        <Helmet>
          <style>{'body { background-color: #f3f2f1; }'}</style>
        </Helmet>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={IndeedLogo} width="120" height="80" alt="Indeed Logo" />
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
              and&nbsp;
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
                style={{ marginBottom: '0px' }}
              >
                Sign In
              </Button>
              <div className={styles.loginOr}>
                <hr />
                <span>or</span>
                <hr />
              </div>
              <Stack direction="column" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={(
                    <img
                      src={GoogleLogo}
                      width="20px"
                      style={{ position: 'absolute', left: 10, top: 7 }}
                      alt="Google Logo"
                    />
                  )}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={(
                    <img
                      src={AppleLogo}
                      width="20px"
                      style={{ position: 'absolute', left: 10, top: 7 }}
                      alt="Apple Logo"
                    />
                  )}
                >
                  Sign in with Apple
                </Button>
                <Button
                  variant="outlined"
                  startIcon={(
                    <img
                      src={FacebookLogo}
                      width="20px"
                      style={{ position: 'absolute', left: 10, top: 7 }}
                      alt="Facebook Logo"
                    />
                  )}
                >
                  Sign in with Facebook
                </Button>
              </Stack>
              <br />
              <div className={styles.loginCentered}>
                <Link href="#/Register" variant="body2">
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
