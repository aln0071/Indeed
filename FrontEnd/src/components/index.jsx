import React from 'react';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import JobSeekerNavbar from './Navbars/JobSeekerNavbar';
import './styles.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
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
    <ThemeProvider theme={theme}>
      <div>
        <JobSeekerNavbar />
        <div className="landingpage">
          <h1 className={classes.title}>Job seeker dashboard</h1>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
