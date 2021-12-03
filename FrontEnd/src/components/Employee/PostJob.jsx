/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import styles from '../../styles.scss';
import EmployerNavbar from '../Navbars/EmployerNavbar';
import { postEmployerJob } from '../../store/actions/jobs';
import { getCompanyDetailsByEmployerId } from '../../utils/endpoints';
import { createToastBody, toastOptions } from '../../utils';

const theme = createTheme();

function PostJob() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [jobTitle, setJobTitle] = useState('');
  const [jobSalary, setJobSalary] = useState();
  const [jobDesc, setJobDesc] = useState('');
  const [jobFullDesc, setJobFullDesc] = useState('');
  const [qualification, setQualification] = useState('');
  const [jobType, setJobType] = useState('');
  const [industry, setIndustry] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [healthInsurance, setHealthInsurance] = useState(false);
  const [paidtimeoff, setPaidTimeOff] = useState(false);
  const [visionInsurance, setVisionInsurance] = useState(false);
  const [flexibleSchedule, setFlexibleSchedule] = useState(false);
  const [retirementPlan, setRetirementPlan] = useState(false);
  const [parentalPlan, setParentalPlan] = useState(false);
  const [eap, setEap] = useState(false);
  const [reloc, setReloc] = useState(false);
  const [lic, setLic] = useState(false);
  const [companyId, setCompanyId] = useState('');

  useEffect(async () => {
    try {
      const companyDetails = await getCompanyDetailsByEmployerId(user.userId);
      if (JSON.stringify(companyDetails) === '{}') {
        history.push('/company-profile');
        toast.info('Create a company profile first', toastOptions);
      } else {
        setCompanyId(companyDetails.companyId);
      }
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  }, []);

  const isValid = (payload) => {
    if (payload.jobTitle === '') {
      toast.error(
        createToastBody({ message: 'Job title cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.jobDescription === '') {
      toast.error(
        createToastBody({ message: 'Job summary cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.qualification === '') {
      toast.error(
        createToastBody({ message: 'Job qualification cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.jobType === '') {
      toast.error(
        createToastBody({ message: 'Job type cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.industry === '') {
      toast.error(
        createToastBody({ message: 'Industry cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.address.addressLine1 === '') {
      toast.error(
        createToastBody({ message: 'Address cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.address.city === '') {
      toast.error(
        createToastBody({ message: 'City cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.address.state === '') {
      toast.error(
        createToastBody({ message: 'State cant be empty' }),
        toastOptions,
      );
      return false;
    }
    if (payload.address.country === '') {
      toast.error(
        createToastBody({ message: 'Country cant be empty' }),
        toastOptions,
      );
      return false;
    }
    const salaryRegex = new RegExp('^[0-9]*[.]?[0-9]+$');
    if (!salaryRegex.test(payload.jobSalary)) {
      toast.error(createToastBody({ message: 'Invalid salary' }), toastOptions);
      return false;
    }
    const zipRegex = new RegExp('^[0-9]{5}$');
    if (!zipRegex.test(payload.address.zipcode)) {
      toast.error(
        createToastBody({ message: 'Zipcode must only contain 5 digits' }),
        toastOptions,
      );
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const benefits = [];
    if (healthInsurance === true) {
      benefits.push('Health Insurance');
    }
    if (paidtimeoff === true) {
      benefits.push('Paid time off');
    }
    if (visionInsurance === true) {
      benefits.push('Vision Insurance');
    }
    if (flexibleSchedule === true) {
      benefits.push('Flexible schedule');
    }
    if (retirementPlan === true) {
      benefits.push('Retirement Plan');
    }
    if (parentalPlan === true) {
      benefits.push('Parental Plan');
    }
    if (eap === true) {
      benefits.push('Employee Assistance Program');
    }
    if (reloc === true) {
      benefits.push('Relocation program');
    }
    if (lic === true) {
      benefits.push('Life Insurance');
    }

    const payload = {
      companyId,
      jobTitle,
      jobSalary,
      jobDescription: jobDesc,
      jobFullDescription: jobFullDesc,
      qualification,
      jobType,
      industry,
      benefits,
      address: {
        addressLine1,
        city,
        state,
        country,
        zipcode,
      },
    };
    if (!isValid(payload)) {
      return;
    }
    dispatch(postEmployerJob(payload));
    history.push('/CompanyProfileEmployerLandingPage');
  };
  return (
    <>
      <EmployerNavbar />
      <ThemeProvider theme={theme}>
        <Container component="main" className={styles.login}>
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
            <Box className={styles.jobsBody}>
              <div className={styles.jobsHeader}>Create a Job Post?</div>
              <div className={styles.jobsLabel}>
                <label>
                  Provide us basic information. We use this information to find
                  the best candidates for this job.
                </label>
              </div>
              <br />
              <Divider />
              <Box sx={{ mt: 1 }}>
                <div>
                  <label className={styles.jobsLabel}>Job Title</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="jobtitle"
                    value={jobTitle}
                    autoComplete="jobtitle"
                    onChange={(e) => {
                      setJobTitle(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className={styles.jobsLabel}>
                    Tell us about this role in a short summary?
                  </label>
                  <TextField
                    margin="normal"
                    multiline
                    minRows={3}
                    required
                    fullWidth
                    id="desc"
                    name="jobDesc"
                    value={jobDesc}
                    autoComplete="jobDesc"
                    onChange={(e) => {
                      setJobDesc(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className={styles.jobsLabel}>
                    What should be the ideal qualification?
                  </label>
                  <TextField
                    margin="normal"
                    multiline
                    minRows={3}
                    required
                    fullWidth
                    value={qualification}
                    id="desc"
                    name="jobDesc"
                    autoComplete="jobDesc"
                    onChange={(e) => {
                      setQualification(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className={styles.jobsLabel}>
                    Give us a full job description
                  </label>
                  <TextField
                    margin="normal"
                    multiline
                    minRows={3}
                    value={jobFullDesc}
                    required
                    fullWidth
                    id="desc"
                    name="jobFullDesc"
                    autoComplete="jobFullDesc"
                    onChange={(e) => {
                      setJobFullDesc(e.target.value);
                    }}
                  />
                </div>
                <br />
              </Box>
            </Box>
            <Box className={styles.jobsBody}>
              <div className={styles.jobsLabel}>
                <label>What best describes about the roles location?</label>
              </div>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <label required className={styles.jobsLabel}>
                      Street name
                    </label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="addressline1"
                      value={addressLine1}
                      name="addressLine1"
                      autoComplete="addressLine1"
                      onChange={(e) => {
                        setAddressLine1(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <label required className={styles.jobsLabel}>
                      City
                    </label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={city}
                      id="city"
                      name="city"
                      autoComplete="city"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <label required className={styles.jobsLabel}>
                      State
                    </label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="state"
                      value={state}
                      name="state"
                      autoComplete="state"
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <label required className={styles.jobsLabel}>
                      Zip code
                    </label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={zipcode}
                      id="zipcode"
                      name="zipcode"
                      autoComplete="zipcode"
                      onChange={(e) => {
                        setZipcode(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <label required className={styles.jobsLabel}>
                      Country
                    </label>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={country}
                      id="country"
                      name="country"
                      autoComplete="country"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box className={styles.jobsBody}>
              <div className={styles.jobsHeader}>Include Details</div>
              <br />
              <div>
                <label required className={styles.jobsLabel}>
                  Is this a full time or a part-time job?
                </label>
              </div>
              <div>
                <RadioGroup
                  defaultValue="Full time"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Full time"
                    control={<Radio />}
                    label="Full time"
                  />
                  <FormControlLabel
                    value="Part time"
                    control={<Radio />}
                    label="Part time"
                  />
                  <FormControlLabel
                    value="Remote"
                    control={<Radio />}
                    label="Remote"
                  />
                </RadioGroup>
              </div>
              <br />
              <div>
                <label required className={styles.jobsLabel}>
                  What industry is the job related to?
                </label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="industry"
                  value={industry}
                  name="industry"
                  autoComplete="industry"
                  onChange={(e) => {
                    setIndustry(e.target.value);
                  }}
                />
              </div>
              <br />
              <div>
                <label required className={styles.jobsLabel}>
                  Are any of the following benefits offered?
                </label>
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          id="healthinsurance"
                          value={healthInsurance}
                          onChange={(e) => setHealthInsurance(e.target.checked)}
                          name="healthinsurance"
                        />
                      )}
                      label="Health insurance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          id="paidtimeoff"
                          value={paidtimeoff}
                          onChange={(e) => setPaidTimeOff(e.target.checked)}
                          name="paidtimeoff"
                        />
                      )}
                      label="Paid time off"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          id="visioninsurance"
                          value={visionInsurance}
                          onChange={(e) => setVisionInsurance(e.target.checked)}
                          name="visioninsurance"
                        />
                      )}
                      label="Vision Insurance"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          id="flexibleschedule"
                          value={flexibleSchedule}
                          onChange={(e) => setFlexibleSchedule(e.target.checked)}
                          name="flexibleschedule"
                        />
                      )}
                      label="Flexible Schedule"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          id="retirementplan"
                          value={retirementPlan}
                          onChange={(e) => setRetirementPlan(e.target.checked)}
                          name="retirementplan"
                        />
                      )}
                      label="Retirement Plan"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          value={parentalPlan}
                          onChange={(e) => setParentalPlan(e.target.checked)}
                          id="parentalleave"
                          name="Parental Leave"
                        />
                      )}
                      label="Parental leave"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          value={eap}
                          onChange={(e) => setEap(e.target.checked)}
                          id="eap"
                          name="eap"
                        />
                      )}
                      label="Employee assistance program"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          value={reloc}
                          id="relocation"
                          onChange={(e) => setReloc(e.target.checked)}
                          name="relocation"
                        />
                      )}
                      label="Relocation assistance"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={(
                        <Checkbox
                          color="secondary"
                          value={lic}
                          id="lic"
                          onChange={(e) => setLic(e.target.checked)}
                          name="lic"
                        />
                      )}
                      label="Life Insurance"
                    />
                  </Grid>
                </Grid>
              </div>
            </Box>
            <Box className={styles.jobsBody}>
              <div>
                <label required className={styles.jobsLabel}>
                  How much salary do you offer for this role per year?
                </label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={jobSalary}
                  id="salary"
                  name="salary"
                  autoComplete="salary"
                  onChange={(e) => {
                    setJobSalary(e.target.value);
                  }}
                />
              </div>
              <br />
              <div className={styles.jobsSave}>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  style={{ backgroundColor: 'rgb(37, 87, 167)' }}
                  fullWidth
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default PostJob;
