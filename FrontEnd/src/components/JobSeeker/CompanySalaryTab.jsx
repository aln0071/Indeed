/* eslint-disable linebreak-style */
/* eslint-disable no-sequences */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import React from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  ListItemIcon,
  Hidden,
  ListItem,
  IconButton,
  ListItemText,
  // Avatar,
  // Divider,
  List,
  // Typography,
  Box,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import '../styles.css';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';
import CompanyTab from './Company/CompanyTabs';
import logo from '../../svg/jobSeekerLogo.svg';
import { ColorButton } from '../customComponents';
import styles from '../../styles.scss';

// const style = {
//   display: 'flex',
//   fontSize: '10',
//   paddingTop: '250px',
//   paddingRight: '750px',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

function CompanySalaryTab() {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/AddSalary');
  };
  return (
    <div>
      {/* <JobSeekerNavbar />

      <CompanyTab/> */}
      <Typography
        component="h1"
        variant="h5"
        className={styles.loginHeader}
        style={{
          // width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Add Your Salary, We Can Match Your Offer
      </Typography>
      <br />
      <div
        style={{
          // width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          paddingLeft="100px"
        >
          <Button size="large" onClick={handleSubmit}>
            Add Salary
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default CompanySalaryTab;
