/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MobileeRightMenuSlider from '@mui/material/Drawer';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
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
import { Link, useHistory } from 'react-router-dom';
import { getAllJobsAction } from '../../store/actions/jobs';
import { ColorButton2 } from '../customComponents';
import logo from '../../svg/jobSeekerLogo.svg';
import './styles.css';

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    background: '#fff',
    height: '100%',
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
    listPath: '/',
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
    listPath: '/PostJob',
  },
];

const JobSeekerNavbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobsAction(1, 5));
  }, []);

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
            onClick={() => {
              if (listItem.listText === 'Find Jobs') {
                dispatch(getAllJobsAction(1, 10));
              }
            }}
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
        <AppBar position="sticky" className="jobSeekerAppbar">
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
                <ColorButton2
                  variant="contained"
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  <PersonIcon style={{ margin: '0 5px 0 5px' }} />
                  {' '}
                  Sign In
                </ColorButton2>
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
                <Link className="nav" id="FindJobs" to="/">
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
                  to="/Login"
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
                <Link id="EmployeeLandingPage" className="nav" to="/PostJob">
                  Employers / Post Job
                </Link>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
JobSeekerNavbar.propTypes = {
  // ...prop type definitions here
};
export default JobSeekerNavbar;
