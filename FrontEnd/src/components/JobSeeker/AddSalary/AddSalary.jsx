/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import DatePicker from '@mui/lab/DatePicker';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';
import { baseUrl } from '../../../utils/constants';
import styles from '../../../styles.scss';
import { createToastBody, toastOptions } from '../../../utils';

const theme = createTheme();

function AddSalary() {
  const history = useHistory();

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [currentPay, setCurrentPay] = useState('');
  const [relevantExp, setRelevantExp] = useState('');
  const [otherBenefitsDesc, setOtherBenefitsDesc] = useState('');
  const [endDate, setendDate] = React.useState(null);

  const isValid = (payload) => {
    const nameRegex = new RegExp('^[a-zA-Z ]{1,256}$');
    if (!nameRegex.test(payload.companyName)) {
      toast.error(
        createToastBody({
          message: 'Company Name Should have only characters',
        }),
        toastOptions,
      );
      return false;
    }
    if (!nameRegex.test(payload.jobTitle)) {
      toast.error(
        createToastBody({ message: 'Job Title Should have only characters' }),
        toastOptions,
      );
      return false;
    }

    if (!nameRegex.test(payload.jobLocation)) {
      toast.error(
        createToastBody({
          message: 'Job Location Should have only characters',
        }),
        toastOptions,
      );
      return false;
    }
    const phoneRegex = new RegExp('^[0-9]{1,10}$');
    if (!phoneRegex.test(payload.currentPay)) {
      toast.error(
        createToastBody({ message: 'Current Pay Should have only digits' }),
        toastOptions,
      );
      return false;
    }
    if (!phoneRegex.test(payload.relevantExp)) {
      toast.error(
        createToastBody({ message: 'Experience Should have only digits' }),
        toastOptions,
      );
      return false;
    }
    return true;
  };
  const userId = useSelector((state) => state.user.userId);
  const companyId = useSelector(
    (state) => state.externalCompanyProfile.companyId,
  );
  console.log(userId);

  const handleSubmit = async () => {
    console.log('helo');
    const payload = {
      companyId,
      companyName,
      jobTitle,
      jobLocation,
      currentlyWorking,
      endDate,
      currentPay,
      relevantExp,
      paidTimeOff,
      healthInsurance,
      lifeInsurance,
      dentalVisionInsurance,
      retirement,
      otherBenefits,
      otherBenefitsDesc,
    };
    if (!isValid(payload)) {
      return;
    }
    axios
      .post(`${baseUrl}indeed/api/jobseeker/add/salary/${userId}`, payload)
      .then((response) => {
        console.log(response);
        // setFile("");
        // //window.location.reload(false);
        history.push('/cmp/companyid');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log('BoolValue', currentlyWorking);

  console.log('hello', companyName);

  const [cancel, setCancel] = useState(false);

  const [state, setState] = React.useState({
    paidTimeOff: false,
    healthInsurance: false,
    lifeInsurance: false,
    dentalVisionInsurance: false,
    retirement: false,
    otherBenefits: false,
  });

  const handleChange = (event) => {
    // console.log(state);

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    console.log('.....', event.target.name);
    if (event.target.name === 'otherBenefits') {
      // console.log(event.target.name);
      setCancel(true);
      console.log(cancel);
    } else {
      setCancel(false);
    }
  };

  const {
    paidTimeOff,
    healthInsurance,
    lifeInsurance,
    dentalVisionInsurance,
    retirement,
    otherBenefits,
  } = state;

  return (
    <>
      <JobSeekerNavbar />
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
            <Box className={styles.salaryBody}>
              <span>1 of 2</span>
              <Typography
                component="h1"
                variant="h5"
                className={styles.loginHeader}
              >
                Can you tell us about yourself?
              </Typography>
              <div className={styles.loginHeader}>
                <label>
                  Let’s start building your report with basics, like your job
                  title, location and company.
                </label>
              </div>
              <br />
              <Divider />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <div className={styles.loginHeader}>
                  <label>What’s your company name?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => {
                      setCompanyName(event.target.value);
                    }}
                  />
                </div>
                <div className={styles.loginHeader}>
                  <label>Are You Currently Working at this company?</label>
                  <br />
                  <br />

                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={() => {
                        setCurrentlyWorking(true);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setCurrentlyWorking(false);
                      }}
                    >
                      No
                    </Button>
                  </ButtonGroup>
                  <br />
                </div>
                <br />
                {currentlyWorking ? (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => {
                        setendDate(newValue);
                      }}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                ) : (
                  <div />
                )}

                <div className={styles.loginHeader}>
                  <label>What’s your Job Title?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="Jon Title"
                    // error={jobTitleError}
                    // helperText={jobTitleHelper}
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => {
                      setJobTitle(event.target.value);
                    }}
                  />
                </div>
                <div className={styles.loginHeader}>
                  <label>What’s your Job Location?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Location"
                    name="Location"
                    // error={jobLocationError}
                    // helperText={jobLocationHelper}
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => {
                      setJobLocation(event.target.value);
                    }}
                  />
                </div>
                <br />
                <Divider />
                <br />
                <Typography
                  component="h1"
                  variant="h5"
                  className={styles.loginHeader}
                >
                  Pay and benefits
                </Typography>
                <div className={styles.loginHeader}>
                  <label>Your anonymous pay will help other job seekers.</label>
                </div>
                <br />
                <div className={styles.loginHeader}>
                  <label>What’s your pay at Your Current Company?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="number"
                    name="number"
                    // error={currentPayError}
                    // helperText={currentPayHelper}
                    autoComplete="number"
                    autoFocus
                    onChange={(event) => {
                      setCurrentPay(event.target.value);
                    }}
                  />
                </div>

                <br />
                <div className={styles.loginHeader}>
                  <label>
                    How many years of relevant experience do you have?
                  </label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="number"
                    name="number"
                    // error={relevantExpError}
                    // helperText={relevantExpHelper}
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => {
                      setRelevantExp(event.target.value);
                    }}
                  />
                </div>
                <br />
                <div className={styles.loginHeader}>
                  <label>Which benefits did you receive at Your Company?</label>
                  <Box sx={{ display: 'flex' }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={paidTimeOff}
                              onChange={handleChange}
                              name="paidTimeOff"
                              defaultChecked
                            />
                          )}
                          label="Paid Time Off"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={healthInsurance}
                              onChange={handleChange}
                              name="healthInsurance"
                              defaultChecked
                            />
                          )}
                          label="Health Insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={lifeInsurance}
                              onChange={handleChange}
                              name="lifeInsurance"
                              defaultChecked
                            />
                          )}
                          label="Life Insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={dentalVisionInsurance}
                              onChange={handleChange}
                              name="dentalVisionInsurance"
                              defaultChecked
                            />
                          )}
                          label="Dental / Vision insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={retirement}
                              onChange={handleChange}
                              name="retirement"
                              defaultChecked
                            />
                          )}
                          label="Retirement / 401(k)"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={otherBenefits}
                              onChange={handleChange}
                              name="otherBenefits"
                            />
                          )}
                          label="Other Benefits"
                        />
                      </FormGroup>
                      {otherBenefits ? (
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="number"
                          name="number"
                          autoComplete="email"
                          autoFocus
                          onChange={(event) => {
                            setOtherBenefitsDesc(event.target.value);
                          }}
                        />
                      ) : (
                        <p />
                      )}
                    </FormControl>
                  </Box>
                </div>

                {/* <br /> */}
                <Divider />
                <br />
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  paddingTop="60px"
                >
                  <Button size="large" onClick={handleSubmit}>
                    Submit
                  </Button>
                </ButtonGroup>
                {/* <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  paddingTop='60px'
                >
                  <Button size="large" onClick={props.next} onClick={handleSubmit}>Next</Button>
                </ButtonGroup> */}
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddSalary;
