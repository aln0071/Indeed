import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JobSeekerNavbar from './Navbars/JobSeekerNavbar';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'initial',
    },
  },
  title: {
    fontSize: '50px',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: '35px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <JobSeekerNavbar />
      <div className="landingpage">
        <h1 className={classes.title}>Job seeker dashboard</h1>
      </div>
    </div>
  );
};

export default Home;
