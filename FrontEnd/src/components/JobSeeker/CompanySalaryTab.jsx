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
import { Link } from 'react-router-dom';
import '../styles.css';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';
import CompanyTab from './Company/CompanyTabs';
import logo from '../../svg/jobSeekerLogo.svg';
import { ColorButton } from '../customComponents';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 0,
    // marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  h5: {
    fontWeight: '400',
    marginBottom: '70px',
  },
  outlinedInput: {
    border: '2px solid #cccccc',
    borderRadius: '10px',
    width: '300px',
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
  paddingTop: '250px',
  paddingRight: '750px',
  justifyContent: 'center',
  alignItems: 'center',
};

function CompanySalaryTab() {
  const classes = useStyles();
  return (
    <div>
      {/* <JobSeekerNavbar />

      <CompanyTab/> */}
      <Container className={classes.container} maxWidth="xl">
        <Typography className={classes.h5} variant="h5" style={style}>
          Average Salaries at
          <br />
          {/* <Typography>we are good comanpany</Typography> */}
        </Typography>

        <List sx={{ width: '20%', maxWidth: 20, bgcolor: 'background.paper' }}>
          <Typography variant="h6" paddingRight="10px">
            Popular Roles
          </Typography>
          <Divider variant="middle" component="li" />

          <ListItem key={2} alignItems="flex-center" style={style}>
            <ListItemText
              primary="card.RestaurantName"
              secondary={(
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    paddingRight="15px"
                  >
                    card.LastUpdatedTime
                  </Typography>
                  {(' ', 'card.OrderStatus')}
                </>
              )}
            />
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default CompanySalaryTab;
