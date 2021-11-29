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

import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import styles from '../../../styles.scss';

import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';

const theme = createTheme();

function AddSalary() {
  const [CompanyName, setCompanyName] = useState('');
  const [JobTitle, setJobTitle] = useState('');
  const [JobLocation, setJobLocation] = useState('');
  const [CurrentlyWorking, setCurrentlyWorking] = useState(false);

  const handleSubmit = () => {
    console.log('helo');
    const payload = {
      //   userId,
      CompanyName,
      JobTitle,
      JobLocation,
      CurrentlyWorking,
    };
    console.log(payload);
  };

  console.log('BoolValue', CurrentlyWorking);

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
                <div className={styles.loginHeader}>
                  <label>What’s your Job Title?</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="Jon Title"
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
