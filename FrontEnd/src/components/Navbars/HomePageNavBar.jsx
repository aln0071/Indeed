/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
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
import { ColorButton } from '../customComponents';
import logo from '../../svg/jobSeekerLogo.svg';
import './styles.css';

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    background: '#fff',
    height: '100%',
    paddingTop: '14px',
  },
  listItem: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));

const menuItems = [
  {
    listText: 'Find Jobs',
    listPath: '/FindJobs',
  },
  {
    listText: 'Company Reviews',
    listPath: '/CompanyReviews',
  },
  {
    listText: 'Find Salaries',
    listPath: '/FindSalaries',
  },
  {
    listText: 'Create your resume',
    listPath: '/',
  },
  {
    listText: 'Employers',
    listPath: '/EmployeeLandingPage',
  },
];

const HomePageNavbar = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const sideList = (slider) => (
    <Box
      component="div"
      className={classes.menuSliderContainer}
      onClick={toggleSlider(slider, false)}
    >
      <List style={{ marginTop: '100px' }}>
        {menuItems.map((listItem, key) => (
          <ListItem
            button
            key={`link-${key}`}
            component={Link}
            to={listItem.listPath}
            style={{
              borderBottom: '1px solid lightgrey',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ListItemText
              className={classes.listItem}
              primary={listItem.listText}
            />
            <ListItemIcon style={{ minWidth: 0 }}>
              <ArrowForwardIosIcon
                style={{ color: '#222', fontSize: '14px' }}
              />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Box component="nav">
        <AppBar
          position="relative"
          marginTop="4000px"
          className="jobSeekerAppbar"
        >
          <Toolbar className="toolbar">
            <Hidden mdUp>
              <img
                src={logo}
                style={{ cursor: 'pointer', paddingRight: '24px' }}
                width="120"
                height="80"
                alt=""
              />
              <div>
                <Link
                  id="SignIn"
                  // className="nav"
                  style={{ color: '#2557a7', fontWeight: 'bold' }}
                  to="/Login"
                >
                  <ColorButton>
                    <PersonIcon style={{ margin: '0 5px 0 5px' }} />
                    {' '}
                    Sign In
                  </ColorButton>
                </Link>
                <IconButton onClick={toggleSlider('right', true)}>
                  <DehazeIcon style={{ color: '#222' }} />
                </IconButton>
                <MobileeRightMenuSlider
                  open={state.right}
                  onClose={toggleSlider('right', false)}
                  anchor="right"
                >
                  {sideList('right')}
                </MobileeRightMenuSlider>
              </div>
            </Hidden>
            <Hidden mdDown>
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
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
HomePageNavbar.propTypes = {
  // ...prop type definitions here
};
export default HomePageNavbar;
