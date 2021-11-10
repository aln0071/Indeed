/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../svg/jobSeekerLogo.svg';
import './styles.css';

const JobSeekerNavbar = () => (
  <div>
    <Box component="nav">
      <AppBar position="fixed" className="jobSeekerAppbar">
        <Toolbar className="toolbar">
          <div style={{ display: 'flex' }}>
            <img
              src={logo}
              style={{ cursor: 'pointer', paddingRight: '24px' }}
              width="120"
              height="80"
              alt=""
            />
            <Link className="nav" id="FindJobs" to="/FindJobs">
              Find Jobs
            </Link>
            <Link id="CompanyReviews" className="nav" to="/CompanyReviews">
              Company Reviews
            </Link>
            <Link id="FindSalaries" className="nav" to="FindSalaries">
              Find Salaries
            </Link>
          </div>
          <div style={{ display: 'flex', height: '80px' }}>
            <Link id="UploadResume" className="nav" to="/">
              Upload Your Resume
            </Link>
            <Link
              id="SignIn"
              className="nav"
              style={{ color: '#2557a7', fontWeight: 'bold' }}
              to="/"
            >
              Sign In
            </Link>
            <hr
              width="1"
              size="1000%"
              style={{
                height: '35px',
                alignSelf: 'center',
                marginRight: '24px',
                marginLeft: '24px',
              }}
            />
            <Link
              id="EmployeeLandingPage"
              className="nav"
              to="/EmployeeLandingPage"
            >
              Employers / Post Job
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
);
JobSeekerNavbar.propTypes = {
  // ...prop type definitions here
};
export default JobSeekerNavbar;
