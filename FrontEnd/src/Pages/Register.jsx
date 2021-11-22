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
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import styles from '../styles.scss';
import IndeedLogo from '../svg/indeed.svg';
import GoogleLogo from '../svg/google.svg';
import AppleLogo from '../svg/apple.svg';
import FacebookLogo from '../svg/facebook.svg';
import { registerUser } from '../utils/endpoints';
import { toastOptions, createToastBody } from '../utils';
import { validations, isValid } from '../utils/validations';

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const history = useHistory();

  const removeError = (key) => {
    const clone = { ...errors };
    delete clone[key];
    setErrors(clone);
  };

  const handleSubmit = async () => {
    const data = {
      email,
      password,
      userType,
    };
    try {
      if (!verified) {
        throw new Error('Error! Invalid captche');
      }
      const localErrors = {};
      const userProfile = validations.register.user;
      Object.keys(userProfile).forEach((key) => {
        if (!isValid(userProfile[key].regex, data[key])) {
          localErrors[key] = userProfile[key].message;
        }
      });
      setErrors(localErrors);
      if (Object.keys(localErrors).length > 0) {
        throw new Error('Error! Invalid data');
      }
      await registerUser({
        email,
        password,
        userType,
      });
      toast.success('Success! User registered', toastOptions);
      history.push('Login');
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
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
              onSubmit={(e) => e.preventDefault()}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className={styles.registerInput}>
                <label>Email Address</label>
                <TextField
                  onChange={(e) => {
                    removeError('email');
                    setEmail(e.target.value);
                  }}
                  value={email}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  error={errors.email !== undefined}
                  helperText={errors.email}
                  autoFocus
                />
              </div>
              <div className={styles.registerInput}>
                <label>Password</label>
                <TextField
                  onChange={(e) => {
                    removeError('password');
                    setPassword(e.target.value);
                  }}
                  value={password}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  error={errors.password !== undefined}
                  helperText={errors.password}
                  autoComplete="current-password"
                />
              </div>
              <div className={styles.registerRadio}>
                <div className={styles.registerInput}>
                  <label>Your role</label>
                  <br />
                  <span>Let us know how you&apos;ll be using our products</span>
                  {errors.userType && (
                    <span>
                      <br />
                      {errors.userType}
                    </span>
                  )}
                </div>
                <FormControl
                  component="fieldset"
                  fullWidth
                  style={{ paddingLeft: '10px' }}
                >
                  <RadioGroup
                    aria-label="role"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      removeError('userType');
                      setUserType(e.target.value);
                    }}
                  >
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
                onClick={() => handleSubmit()}
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
