/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Hidden, Input } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import SearchIcon from '@material-ui/icons/Search';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, makeStyles } from '@material-ui/core';
import CustomPagination from '../customComponents/Pagination';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import JobCard from '../JobCard';
import SearchField from '../shared/SearchField';
import { ColorButton2 } from '../customComponents/index';
import JobCardExpanded from '../JobCardExpanded';
import {
  getSpecificJobAction,
  getSearchedJobsAction,
  storeSearchedAction,
} from '../../store/actions/jobs';
import { uploadResumeAction } from '../../store/actions/resume';
import { setUserDetailsAction } from '../../store/actions/user';
import { baseUrl, urls } from '../../utils/constants';
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
  const history = useHistory();
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const searchedJobs = useSelector((state) => state.jobs.searchedJobs.jobs);
  const searchValues = useSelector((state) => state.jobs.searchedValues);
  const meta = useSelector((state) => state.jobs.searchedJobs.metadata);
  const user = useSelector((state) => state.user);
  const resumeKey = useSelector((state) => state.resume.resumeKey);
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [value, setValue] = useState('1');
  const [page, setPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);
  const [lastSearched, setLastSearched] = useState(searchValues);
  const [metaData, setMetaData] = useState({});
  const [isResume, setIsResume] = useState(resumeKey);

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
    dispatch(getSearchedJobsAction(what, where, val, 5));
  };

  const postUserProfile = async () => {
    const url = `${baseUrl}${urls.updateUserProfile}`;
    const body = {
      userId: user.userId,
      resume: resumeKey,
    };
    const headers = {
      // Authorization: token,
    };
    try {
      const res = await axios.post(url, body, { headers });
      console.log('response', res.data);
      // TODO Fetch User Profile
      await dispatch(setUserDetailsAction(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append('resume', file);
    if (fileData) {
      const response = await axios.post(
        `${baseUrl}${urls.uploadResume}`,
        fileData,
      );
      await dispatch(uploadResumeAction(response.data.fileKey));
      postUserProfile(response.data.fileKey);
    }
  };

  useEffect(() => {
    setSearchResults(searchedJobs);
    if (searchedJobs[0]) {
      dispatch(
        getSpecificJobAction(searchedJobs[0].companyId, searchedJobs[0].jobId),
      );
    }
  }, [searchedJobs]);

  useEffect(() => {
    setMetaData(meta);
  }, [meta]);

  useEffect(() => {
    setSelectedJobs(specificJob);
  }, [specificJob]);

  useEffect(() => {
    setLastSearched(searchValues);
  }, [searchValues]);

  useEffect(() => {
    setIsResume(resumeKey);
  }, [resumeKey]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <JobSeekerNavbar />
      <div className="wrapper">
        <Grid
          container
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
        {isResume === '' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <label
              htmlFor="resume"
              style={{
                all: 'unset',
                fontWeight: 'bold',
                color: '#2557a7',
                cursor: 'pointer',
              }}
            >
              <Input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="resume"
                name="resume"
                required
                autoFocus
                type="file"
                // onChange={(e) => {
                //   handleUploadResume(e);
                // }}
                onChange={(e) => {
                  if (Object.keys(user).length === 0) {
                    history.push('/Login');
                  } else {
                    handleUploadResume(e);
                  }
                }}
              />
              Post Your Resume -
            </label>
            It only takes a few seconds
          </div>
        )}
        <br />
        <hr />
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
                    {searchResults
                      && searchResults.length > 0
                      && searchResults.map((item, index) => (
                        <p key={`job-${index}`}>
                          <JobCard job={item} />
                        </p>
                      ))}
                    <CustomPagination
                      count={metaData ? metaData.totalPages : 0}
                      page={page}
                      handleChangePage={handleChangePage}
                    />
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
                  {searchResults
                    && searchResults.length > 0
                    && searchResults.map((item, index) => (
                      <p key={`job-${index}`}>
                        <JobCard job={item} />
                      </p>
                    ))}
                  <CustomPagination
                    count={metaData ? metaData.noOfPagesLeft : 0}
                    page={page}
                    handleChangePage={handleChangePage}
                  />
                </div>
              </div>
            </Hidden>
          </TabPanel>
          <TabPanel value="2">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                background: '#faf9f8',
                alignItems: 'center',
              }}
            >
              {lastSearched.length > 0 ? (
                lastSearched.map((item, index) => (
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
                ))
              ) : (
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
                  No Recent Results
                </div>
              )}
            </div>
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
