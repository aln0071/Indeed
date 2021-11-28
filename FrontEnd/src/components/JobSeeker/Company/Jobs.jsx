/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, makeStyles } from '@material-ui/core';
import CustomPagination from '../../customComponents/Pagination';
import JobCard from '../../JobCard';
import SearchField from '../../shared/SearchField';
import { ColorButton3 } from '../../customComponents/index';
import JobCardExpanded from '../../JobCardExpanded';
import {
  getSpecificJobAction,
  getSearchedJobsAction,
} from '../../../store/actions/jobs';
import '../../styles.css';

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
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const searchedJobs = useSelector((state) => state.jobs.searchedJobs);

  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [page, setPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);

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

  useEffect(() => {
    setSearchResults(searchedJobs);
    if (searchedJobs[0]) {
      dispatch(
        getSpecificJobAction('619d1f2d333e9575297d0b73', searchedJobs[0].jobId),
      );
    }
  }, [searchedJobs]);

  useEffect(() => {
    setSelectedJobs(specificJob);
  }, [specificJob]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
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
          <ColorButton3
            variant="contained"
            style={{
              padding: '12px',
              border: '0.125rem solid #085ff7',
              borderRadius: '6.25rem',
              width: '10%',
              cursor: 'pointer',
            }}
            onClick={() => {
              dispatch(getSearchedJobsAction(what, where, 1, 10));
            }}
          >
            {' '}
            Find Jobs
          </ColorButton3>
        </Grid>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Hidden mdDown>
            <div className="child">
              <div className="left">
                <div className="cardWrapper">
                  {searchResults.map((item, index) => (
                    <p key={`job-${index}`}>
                      <JobCard job={item} />
                    </p>
                  ))}
                  <CustomPagination
                    count={10}
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
                {searchResults.map((item, index) => (
                  <p key={`job-${index}`}>
                    <JobCard job={item} />
                  </p>
                ))}
                <CustomPagination
                  count={10}
                  page={page}
                  handleChangePage={handleChangePage}
                />
              </div>
            </div>
          </Hidden>
        </Box>
      </div>
    </Box>
  );
}

StartLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FindJobs;
