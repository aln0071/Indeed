/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden } from '@mui/material';
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
import { ColorButton2 } from '../customComponents/index';
import JobCardExpanded from '../JobCardExpanded';
import { getSpecificJobAction } from '../../store/actions/jobs';
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
  const dispatch = useDispatch();

  const allJobs = useSelector((state) => state.jobs.allJobs);
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const [allJobValues, setAllJobValues] = useState(allJobs);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeWhat = () => {};

  const handleChangeWhere = () => {};
  useEffect(() => {
    setAllJobValues(allJobs);
    if (allJobs[0]) {
      dispatch(
        getSpecificJobAction('619d1f2d333e9575297d0b73', allJobs[0].jobId),
      );
    }
  }, [allJobs]);

  useEffect(() => {
    setSelectedJobs(specificJob);
  }, [specificJob]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <JobSeekerNavbar />
      <div className="wrapper">
        <Grid
          container
          // spacing={{ xs: 2, sm: 2, md: 2 }}
          // columns={{ xs: 3, sm: 1, md: 3 }}
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
            endormentPosition="start"
            endIcon={<SearchIcon />}
            startIcon={<StartLabel label="What" />}
          />
          <SearchField
            required={false}
            value=""
            plceholder="City, state, or pin code"
            onChange={handleChangeWhere}
            endormentPosition="start"
            endIcon={<SearchIcon />}
            startIcon={<StartLabel label="Where" />}
          />
          <ColorButton2
            variant="contained"
            style={{ padding: '14px', borderRadius: '8px' }}
            onClick={() => {
              console.log(0);
            }}
          >
            {' '}
            Find Jobs
          </ColorButton2>
        </Grid>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Job Feed" value="1" style={{ fontSize: '16px' }} />
              <Tab
                label="Recent Searches"
                value="2"
                style={{ fontSize: '16px' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: 0 }}>
            <Hidden mdDown>
              <div className="subChild2">
                <div className="left">
                  <div className="cardWrapper">
                    {allJobValues.map((item, index) => (
                      <p key={`job-${index}`}>
                        <JobCard job={item} />
                      </p>
                    ))}
                  </div>
                </div>
                <div className="right">
                  <div className="cardWrapper">
                    <p>
                      <JobCardExpanded selectedJob={selectedJobs} />
                    </p>
                  </div>
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div>
                <div className="cardWrapper">
                  {allJobValues.map((item, index) => (
                    <p key={`job-${index}`}>
                      <JobCard job={item} />
                    </p>
                  ))}
                </div>
              </div>
            </Hidden>
          </TabPanel>
          <TabPanel value="2">
            <Hidden mdDown>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  background: '#faf9f8',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    width: '50%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '50%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '50%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '50%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  background: '#faf9f8',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    width: '80%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '80%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '80%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
                <div
                  style={{
                    background: '#fff',
                    width: '80%',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                    alignItems: 'center',
                  }}
                >
                  Search Results
                </div>
              </div>
            </Hidden>
          </TabPanel>
        </TabContext>
      </div>
    </Box>
  );
}

StartLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FindJobs;
