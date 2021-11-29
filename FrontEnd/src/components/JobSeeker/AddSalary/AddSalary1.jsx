/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import ButtonGroup from '@mui/material/ButtonGroup';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import styles from '../../../styles.scss';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';

const theme = createTheme();

function AddSalary1({ CompanyName }, props) {
  const [CurrentPay, setCurrentPay] = useState('');
  const [RelevantExp, setRelevantExp] = useState('');
  //   const [PaidTimeOffValue, setPaidTimeOff] = useState(false);
  //   const [HealthInsuranceValue, setHealthInsurance] = useState(false);
  //   const [LifeInsuranceValue, setLifeInsurance] = useState(false);
  //   const [DentalValue, setDental] = useState(false);
  //   const [RetirementValue, setRetirement] = useState(false);
  const [OtherBenefitsValue, setOtherBenefitsValue] = useState('');

  console.log('hello', CompanyName);

  const [cancel, setCancel] = useState(false);

  const [state, setState] = React.useState({
    PaidTimeOff: false,
    HealthInsurance: false,
    LifeInsurance: false,
    Dental: false,
    Retirement: false,
    OtherBenefits: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    console.log(event.target.checked);
    if (event.target.name === 'Other Benefits') {
      console.log(event.target.name);
      setCancel(true);
      console.log(cancel);
    }
  };

  const {
    PaidTimeOff,
    HealthInsurance,
    LifeInsurance,
    Dental,
    Retirement,
    OtherBenefits,
  } = state;

  const handleSubmit = async () => {
    console.log('checkArray', PaidTimeOff);
    const payload = {
      //   userId,
      CurrentPay,
      RelevantExp,
      PaidTimeOff,
      HealthInsurance,
      LifeInsurance,
      Dental,
      Retirement,
      OtherBenefitsValue,
    };
    console.log('payload 123', payload);

    const tokenValue = localStorage.getItem('token');

    //   axios
    //     .post(`${backendServer}/UserProfile`, payload, {
    //       headers: {
    //         authorization: tokenValue,
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       // setFile("");
    //       // //window.location.reload(false);
    //       // history.push("/RestaurantView");
    //     });
  };

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
              <span>2 of 2</span>
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
              <Divider />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <div className={styles.loginHeader}>
                  <label>What’s your pay at Your Current Company?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="number"
                    name="number"
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
                              checked={PaidTimeOff}
                              onChange={handleChange}
                              name="PaidTimeOff"
                              defaultChecked
                            />
                          )}
                          label="Paid Time Off"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={HealthInsurance}
                              onChange={handleChange}
                              name="HealthInsurance"
                              defaultChecked
                            />
                          )}
                          label="Health Insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={LifeInsurance}
                              onChange={handleChange}
                              name="LifeInsurance"
                              defaultChecked
                            />
                          )}
                          label="Life Insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={Dental}
                              onChange={handleChange}
                              name="Dental"
                              defaultChecked
                            />
                          )}
                          label="Dental / Vision insurance"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={Retirement}
                              onChange={handleChange}
                              name="Retirement"
                              defaultChecked
                            />
                          )}
                          label="Retirement / 401(k)"
                        />
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={OtherBenefits}
                              onChange={handleChange}
                              name="Other Benefits"
                            />
                          )}
                          label="Other Benefits"
                        />
                      </FormGroup>
                      {cancel ? (
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="number"
                          name="number"
                          autoComplete="email"
                          autoFocus
                          onChange={(event) => {
                            setOtherBenefitsValue(event.target.value);
                          }}
                        />
                      ) : (
                        <p />
                      )}
                    </FormControl>
                  </Box>
                </div>

                <br />
                <Divider />
                <br />
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  paddingTop="60px"
                >
                  <Button
                    size="large"
                    onClick={props.next}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddSalary1;
