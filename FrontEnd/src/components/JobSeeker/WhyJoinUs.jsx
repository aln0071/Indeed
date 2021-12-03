/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable import/no-cycle */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState, useEffect } from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import HomePageNavbar from '../Navbars/HomePageNavBar';
import '../styles.css';
import CompanyTab from './Company/CompanyTabs';
import { baseUrl, urls } from '../../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  FormHelperText,
  ListItem,
  Card,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "#f2f2f2",
    padding: 0,
    // marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'felx-start',
  },
  boxSearch: {
    backgroundColor: 'white',
    margin: 0,
    height: '310px',
    backgroundPosition: 'bottom right',
    backgroundImage: 'url(/Images/companyreview.PNG)',
    backgroundRepeat: 'no-repeat',
  },
  outerSearchGrid: {
    marginTop: '50px',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  h3: {
    fontWeight: 'normal',
    // marginBottom: "20px",
    // paddingLeft: "300px",
    alignItems: 'flex-start !important',
    textalign: 'end',
  },
  h5: {
    fontWeight: '400',
    marginBottom: '20px',
    // paddingRight: "300px",
    alignItems: 'flex-start !important',
    color: 'black',
  },
  outlinedInput: {
    border: '2px solid #cccccc',
    borderRadius: '10px',
    width: '600px',
    marginRight: 10,
  },
  formhelperText: {
    color: '#085ff7',
    paddingLeft: '20px',
    cursor: 'pointer',
  },
  companiesHiring: {
    marginTop: '50px',
    marginBottom: '20px',
    backgroundColor: 'white',
    display: 'flex',
  },
}));

const style = {
  display: 'flex',
  fontSize: '10',

  //   paddingRight: "650px",
  justifyContent: 'center',
  alignItems: 'flex-start',
};

function WhyJoinUs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cmpId = useSelector((state) => state.externalCompanyProfile.companyId);

  console.log(cmpId, 'fsdfdsfsdf');

  const [aboutUs, setAboutUs] = useState('');
  const [workCulture, setWorkCulture] = useState('');
  const [companyValue, setCompanyValue] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(async () => {
    const id = '61a32673a0660ee943876fc0';
    const response = await axios.get(
      `${baseUrl}indeed/api/companyDetails/${cmpId}`,
    );
    console.log(response.data);
    if (response) {
      setAboutUs(response.data.aboutUs);
      setWorkCulture(response.data.workCulture);
      setCompanyValue(response.data.companyValues);
      setCompanyName(response.data.companyName);
    }
    console.log(aboutUs);
  }, []);

  // console.log(workCulture)
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <JobSeekerNavbar /> */}
      {/* <HomePageNavbar/> */}

      <Container className={classes.container} maxWidth="xl">
        <Typography className={classes.h5} variant="h5" style={style}>
          About
          {' '}
          {companyName}
        </Typography>
        <Typography className={classes.h3} style={style}>
          {aboutUs}
        </Typography>
        <br />
        <br />
        <Typography className={classes.h5} variant="h5" style={style}>
          Work Culture
        </Typography>
        <Typography className={classes.h3} style={style}>
          {workCulture}
        </Typography>

        <br />
        <br />
        <Typography className={classes.h5} variant="h5" style={style}>
          Company Values
        </Typography>
        <Typography className={classes.h3} style={style}>
          {companyValue}
        </Typography>
      </Container>
    </div>
  );
}

export default WhyJoinUs;
