/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import MobileeRightMenuSlider from '@mui/material/Drawer';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles } from '@mui/styles';
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
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { Link } from 'react-router-dom';
import { ColorButton } from '../customComponents';
import logo from '../../svg/employeeLogo.svg';
import './styles.css';

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    background: '#333333',
    height: '100%',
  },
  listItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));

const menuItems = [
  {
    listText: 'Post a job',
    listPath: '/PostJob',
  },
  {
    listText: 'Find Candidates',
    listPath: '/FindCandidates',
  },
  {
    listText: 'Products',
    listPath: '/Products',
  },
  {
    listText: 'Resources',
    listPath: '/Resources',
  },
  {
    listText: 'Visit Indeed for Job Seekers',
    listPath: '/',
  },
  {
    listText: 'Analysis',
    listPath: '/Analysis',
  },
];

const EmployerNavbar = () => {
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
      <List style={{ marginTop: '40px' }}>
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
                style={{ color: 'lightgrey', fontSize: '14px' }}
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
        <AppBar position="sticky" className="employerAppbar">
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
                  // className="navEmployee"
                  style={{ color: '#2557a7', fontWeight: 'bold' }}
                  to="/PostJob"
                >
                  <ColorButton>Sign In</ColorButton>
                </Link>
                <IconButton onClick={toggleSlider('right', true)}>
                  <DehazeIcon style={{ color: '#fff' }} />
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
                  to="/PostJob" // add later, given dummy value for now
                  style={{ color: '#fff' }}
                >
                  Resources
                </Link>
                <Link
                  id="Analysis"
                  className="navEmployee"
                  to="/Analysis" // add later, given dummy value for now
                  style={{ color: '#fff' }}
                >
                  Analysis
                </Link>
              </div>
              <div style={{ display: 'flex', height: '80px' }}>
                <Link
                  id="HelpCenter"
                  className="navEmployee"
                  to="/PostJob" // add later, given dummy value for now
                  style={{
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                  }}
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
                  to="/PostJob"
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
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
EmployerNavbar.propTypes = {
  // ...prop type definitions here
};
export default EmployerNavbar;
