/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import CustomPagination from '../../customComponents/Pagination';
import JobCard from '../../JobCard';
import JobCardExpanded from '../../JobCardExpanded';
import {
  getSpecificJobAction,
  getCompanySpecificJobs,
} from '../../../store/actions/jobs';
import '../../styles.css';

function FindJobs() {
  const dispatch = useDispatch();
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const searchedJobs = useSelector((state) => state.jobs.companySpecificJobs);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);
  const location = useLocation();

  useEffect(() => {
    dispatch(getCompanySpecificJobs(location.search.split('=')[1], 1, 5));
  }, []);

  const handleChangePage = (event, val) => {
    setPage(val);
    dispatch(getCompanySpecificJobs(location.search.split('=')[1], val, 5));
  };

  useEffect(() => {
    setSearchResults(searchedJobs.reviews);
    setMeta(searchedJobs.metadata);
    if (searchedJobs.reviews && searchedJobs.reviews[0]) {
      dispatch(
        getSpecificJobAction(
          location.search.split('=')[1],
          searchedJobs.reviews[0].jobId,
        ),
      );
    }
  }, [searchedJobs]);

  useEffect(() => {
    setSelectedJobs(specificJob);
  }, [specificJob]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <div className="wrapper">
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Hidden mdDown>
            <div className="child">
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
                    count={meta ? meta.totalPages : 0}
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
                  count={meta ? meta.totalPages : 0}
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

export default FindJobs;
