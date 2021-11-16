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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import Stack from '@mui/material/Stack';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { verify } from 'hcaptcha';
import styles from '../styles.scss';
import IndeedLogo from '../svg/indeed.svg';
import GoogleLogo from '../svg/google.svg';
import AppleLogo from '../svg/apple.svg';
import FacebookLogo from '../svg/facebook.svg';

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

let verified = false;

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (verified) {
      // proceed with form submission
    } else {
      // wrong captche
    }
  };

  const onVerifyCaptcha = async (token) => {
    try {
      const data = await verify(process.env.CAPTCHA_SECRET, token);
      verified = data.success === true;
    } catch (error) {
      verified = false;
      console.log(error);
    }
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
            marginBottom: 3,
          }}
        >
          <img src={IndeedLogo} width="120" height="80" alt="Indeed Logo" />
          <Box className={styles.loginBody}>
            <Typography
              component="h1"
              variant="h5"
              className={styles.registerHeader}
            >
              Create an Account (it&apos;s free)
            </Typography>
            <p className={styles.registerPolicy}>
              By signing in to your account, you agree to Indeed&#39;s
              {' '}
              <a href="#">Terms of Service</a>
              ,
              <a href="#">Cookie Policy</a>
              {' '}
              and&nbsp;
              <a href="#">Privacy Policy</a>
              . You consent to receiving marketing
              messages from Indeed and may opt out from receiving such messages
              by following the unsubscribe link in our messages, or as detailed
              in our terms.
            </p>
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
            <div className={styles.loginOr}>
              <hr />
              <span>or</span>
              <hr />
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className={styles.registerInput}>
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
              <div className={styles.registerInput}>
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
              <div className={styles.registerRadio}>
                <div className={styles.registerInput}>
                  <label>Your role</label>
                  <br />
                  <span>Let us know how you&apos;ll be using our products</span>
                </div>
                <FormControl
                  component="fieldset"
                  fullWidth
                  style={{ paddingLeft: '10px' }}
                >
                  <RadioGroup aria-label="role" name="radio-buttons-group">
                    <FormControlLabel
                      className={styles.registerRadioButton}
                      value="employer"
                      control={<Radio style={{ padding: '7px' }} />}
                      label="Employer"
                    />
                    <FormControlLabel
                      className={styles.registerRadioButton}
                      value="jobseeker"
                      control={<Radio style={{ padding: '7px' }} />}
                      label="Job seeker"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <FormControlLabel
                className={styles.registerCheckbox}
                control={<Checkbox value="remember" color="primary" />}
                label="Keep me signed in on this device."
              />
              <HCaptcha
                sitekey={process.env.CAPTCHA_KEY}
                onVerify={(token) => onVerifyCaptcha(token)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ marginBottom: '0px' }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" align="center">
          <Link href="#/Login" variant="body2">
            Have an account? Sign in
          </Link>
          <br />
          <br />
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
