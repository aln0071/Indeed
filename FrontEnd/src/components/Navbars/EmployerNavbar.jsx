/* eslint-disable import/no-unresolved */
import React from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import { ColorButton } from '../customComponents';
import logo from '../../svg/employeeLogo.svg';
import './styles.css';

const EmployerNavbar = () => (
  <div>
    <Box component="nav">
      <AppBar position="fixed" className="employerAppbar">
        <Toolbar className="toolbar">
          <div style={{ display: 'flex' }}>
            <img
              src={logo}
              style={{ cursor: 'pointer', paddingRight: '24px' }}
              width="120"
              height="80"
              alt=""
            />
            <Link
              className="navEmployee"
              id="PostJob"
              to="/PostJob"
              style={{ color: '#fff' }}
            >
              Post a Job
            </Link>
            <Link
              className="navEmployee"
              id="FindCandidates"
              to="/FindCandidates"
              style={{ color: '#fff' }}
            >
              Find Candidates
            </Link>
            <Link
              id="Products"
              className="navEmployee"
              to="/Products"
              style={{ color: '#fff' }}
            >
              Products
            </Link>
            <Link
              id="Resources"
              className="navEmployee"
              to="/EmployeeLandingPage"
              style={{ color: '#fff' }}
            >
              Resources
            </Link>
          </div>
          <div style={{ display: 'flex', height: '80px' }}>
            <Link
              id="HelpCenter"
              className="navEmployee"
              to="/EmployeeLandingPage"
              style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
            >
              <span style={{ marginRight: '5px' }}>Help Center</span>
              <HelpIcon />
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
              id="SignIn"
              className="navEmployee"
              style={{ color: '#2557a7', fontWeight: 'bold' }}
              to="/EmployeeLandingPage"
            >
              <ColorButton>Sign In</ColorButton>
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
              id="FindJobs"
              className="navEmployee"
              to="/"
              style={{ color: '#fff' }}
            >
              Find Jobs
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
);
EmployerNavbar.propTypes = {
  // ...prop type definitions here
};
export default EmployerNavbar;
