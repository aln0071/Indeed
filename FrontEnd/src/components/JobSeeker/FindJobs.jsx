/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import SearchIcon from '@material-ui/icons/Search';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, makeStyles } from '@material-ui/core';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import JobCard from '../JobCard';
import SearchField from '../shared/SearchField';
import FindButton from '../shared/FindButton';

import '../styles.css';

const useStyles = makeStyles(() => ({
  searchContainer: {
    margin: '40px 0',
  },
}));

const StartLabel = ({ label }) => (
  <h3 style={{ fontFamily: 'bold' }}>{label}</h3>
);

function FindJobs() {
  const classes = useStyles();
  const [value, setValue] = useState('1');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChangeWhat = () => {};

  const handleChangeWhere = () => {};
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <JobSeekerNavbar />
      <div className="wrapper">
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
          columns={{ xs: 3, sm: 1, md: 3 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.searchContainer}
        >
          <SearchField
            required={false}
            value=""
            plceholder="Job title, keywords, or company"
            onChange={handleChangeWhat}
            endormentPosition="left"
            endIcon={<SearchIcon />}
            startIcon={<StartLabel label="What" />}
          />
          <SearchField
            required={false}
            value=""
            plceholder="City, state, or pin code"
            onChange={handleChangeWhere}
            endormentPosition="left"
            endIcon={<SearchIcon />}
            startIcon={<StartLabel label="Where" />}
          />
          <FindButton label="Find jobs" />
        </Grid>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Job Feed" value="1" />
              <Tab label="Recent Searches" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: 0 }}>
            <div className="subChild2">
              <div className="left">
                <div className="cardWrapper">
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                </div>
              </div>
              <div className="right">Right Class</div>
            </div>
          </TabPanel>
          <TabPanel value="2">Recent Searches</TabPanel>
        </TabContext>
      </div>
    </Box>
  );
}

StartLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FindJobs;
