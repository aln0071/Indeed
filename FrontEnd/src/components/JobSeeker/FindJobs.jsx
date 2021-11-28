/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
import {
  getSpecificJobAction,
  getSearchedJobsAction,
  storeSearchedAction,
  getAllJobsAction,
} from '../../store/actions/jobs';
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
  const dispatch = useDispatch();

  const allJobs = useSelector((state) => state.jobs.allJobs);
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const searchedJobs = useSelector((state) => state.jobs.searchedJobs);
  const searchValues = useSelector((state) => state.jobs.searchedValues);

  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [value, setValue] = useState('1');
  const [page, setPage] = useState(1);
  const [allJobValues, setAllJobValues] = useState(allJobs);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);
  const [lastSearched, setLastSearched] = useState(searchValues);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeWhat = (e) => {
    setWhat(e.target.value);
  };

  const handleChangeWhere = (e) => {
    setWhere(e.target.value);
  };

  const handleChangePage = (event, val) => {
    setPage(val);
    dispatch(getAllJobsAction(val, 5));
  };

  // const clearSearch = () => {
  //   setWhat('');
  //   setWhere('');
  //   setSearchResults([]);
  //   dispatch(getSearchedJobsAction('', '', 1, 10));
  // };

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

  useEffect(() => {
    setSearchResults(searchedJobs);
  }, [searchedJobs]);

  useEffect(() => {
    setLastSearched(searchValues);
  }, [searchValues]);

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
            value={what}
            plceholder="Job title, keywords, or company"
            onChange={handleChangeWhat}
            endormentPosition="start"
            endIcon={<SearchIcon />}
            startIcon={<StartLabel label="What" />}
          />
          <SearchField
            required={false}
            value={where}
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
              const search = searchValues;
              if (what) {
                search.unshift(what);
              }
              if (where) {
                search.unshift(where);
              }
              while (search.length > 5) {
                search.pop();
              }
              dispatch(storeSearchedAction(search));
              dispatch(getSearchedJobsAction(what, where, 1, 10));
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
                    {what || where
                      ? searchResults.map((item, index) => (
                        <p key={`job-${index}`}>
                          <JobCard job={item} />
                        </p>
                      ))
                      : allJobValues.map((item, index) => (
                        <p key={`job-${index}`}>
                          <JobCard job={item} />
                        </p>
                      ))}
                    <Stack spacing={2}>
                      <Pagination
                        count={20}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                      />
                    </Stack>
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
                  {what || where
                    ? searchResults.map((item, index) => (
                      <p key={`job-${index}`}>
                        <JobCard job={item} />
                      </p>
                    ))
                    : allJobValues.map((item, index) => (
                      <p key={`job-${index}`}>
                        <JobCard job={item} />
                      </p>
                    ))}
                  <Stack spacing={2}>
                    <Pagination
                      count={20}
                      page={page}
                      onChange={handleChangePage}
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
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
                {lastSearched.map((item, index) => (
                  <div
                    key={`search-${index}`}
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
                    {item}
                  </div>
                ))}
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
                {lastSearched.map((item, index) => (
                  <div
                    key={`search-${index}`}
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
                    {item}
                  </div>
                ))}
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
