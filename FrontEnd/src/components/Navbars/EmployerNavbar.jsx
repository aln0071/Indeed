/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint
  jsx-a11y/click-events-have-key-events: 0,
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
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
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { clearUserDetailsAction } from '../../store/actions/user';
import logo from '../../svg/employeeLogo.svg';
import { ColorButton } from '../customComponents';
import styles from '../../styles.scss';

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
    listText: 'View Company Reviews',
    listPath: '/employee/ViewCompanyReviews',
  },
  {
    listText: 'Posted Jobs',
    listPath: '/employee/ViewPostedJobs',
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
  const history = useHistory();
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const operations = {
    logout: () => {
      dispatch(clearUserDetailsAction());
    },
    profile: () => {
      history.push('/company-profile');
    },
    gotoJobseekers: () => {
      history.push('/');
    },
  };

  const handleMenuClose = (operation = () => {}) => {
    setAnchorEl(null);
    try {
      operation();
    } catch (error) {
      console.log(error);
    }
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
                onClick={() => history.push('/CompanyProfileEmployerLandingPage')}
              />
              <div>
                <Link
                  id="SignIn"
                  className="navEmployee"
                  style={{ color: '#2557a7', fontWeight: 'bold' }}
                  to="/PostJob"
                >
                  <ColorButton variant="contained">Sign In</ColorButton>
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
                  onClick={() => {
                    history.push('/CompanyProfileEmployerLandingPage');
                  }}
                />
                <Link
                  className="navEmployee"
                  id="PostJob"
                  to="/employer/PostJob"
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
                  id="ViewCompanyReviews"
                  className="navEmployee"
                  to="/employee/ViewCompanyReviews"
                  style={{ color: '#fff' }}
                >
                  View Company Reviews
                </Link>
                <Link
                  id="ViewPostedJobs"
                  className="navEmployee"
                  to="/employee/ViewPostedJobs"
                  style={{ color: '#fff' }}
                >
                  View Posted Jobs
                </Link>
                <Link
                  id="Resources"
                  className="navEmployee"
                  to="/employer/PostJob" // add later, given dummy value for now
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
                {user.userId
                  && history.location.pathname
                    === '/CompanyProfileEmployerLandingPage' && (
                    <>
                      <ColorButton
                        variant="contained"
                        style={{
                          height: '30px',
                          marginTop: '30px',
                          textTransform: 'none',
                        }}
                        onClick={() => {
                          history.push('/employer/PostJob');
                        }}
                      >
                        Back to Hiring
                      </ColorButton>
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
                    </>
                )}
                <Link
                  id="HelpCenter"
                  className="navEmployee"
                  // to="/PostJob" // add later, given dummy value for now
                  style={{
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ marginRight: '5px' }}>Help Center</span>
                  <HelpIcon />
                </Link>
                {!user.userId ? (
                  <>
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
                    <ColorButton
                      variant="contained"
                      style={{
                        height: '30px',
                        marginTop: '25px',
                        textTransform: 'none',
                      }}
                      onClick={() => {
                        history.push('/login');
                      }}
                    >
                      Sign In
                    </ColorButton>
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
                  </>
                ) : (
                  <>
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
                      id="Profile"
                      onClick={handleMenu}
                      className={`navEmployee ${styles.navIcon} ${styles.navIconLast}`}
                      to="#"
                    >
                      <PersonIcon sx={{ color: 'white' }} />
                    </Link>
                  </>
                )}
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        // open={true}
        onClose={handleMenuClose}
        // className={styles.navMenu}
        style={{ transform: 'translate(10px, 50px)' }}
      >
        {/* <div className={styles.navNotch} ></div> */}
        <div className={styles.navMenuUsername}>{user.email}</div>
        <MenuItem onClick={() => handleMenuClose(operations.profile)}>
          <PersonIcon className={styles.navMenuIcon} />
          {' '}
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SettingsIcon className={styles.navMenuIcon} />
          {' '}
          My Settings
        </MenuItem>
        <hr className={styles.navMenuDivider} />
        <MenuItem onClick={() => handleMenuClose(operations.gotoJobseekers)}>
          <div className={styles.navMenuSignout}>
            Visit Indeed for job seekers
          </div>
        </MenuItem>
        <hr className={styles.navMenuDivider} />
        <MenuItem onClick={() => handleMenuClose(operations.logout)}>
          <div className={styles.navMenuSignout}>Sign out</div>
        </MenuItem>
      </Menu>
    </div>
  );
};
EmployerNavbar.propTypes = {
  // ...prop type definitions here
};
export default EmployerNavbar;
