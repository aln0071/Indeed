/* eslint-disable no-unused-vars */
// export default Products;
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import EmployerNavbar from '../Navbars/EmployerNavbar';
import CustomPagination from '../customComponents/Pagination';
import JobCard from '../JobCard';
import JobCardExpanded from '../JobCardExpanded';
import {
  getSpecificJobAction,
  getCompanySpecificJobs,
} from '../../store/actions/jobs';
import '../styles.css';

function FindJobs() {
  const dispatch = useDispatch();
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const searchedJobs = useSelector((state) => state.jobs.companySpecificJobs);

  const [page, setPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);

  const handleChangePage = (event, val) => {
    setPage(val);
    dispatch(getCompanySpecificJobs('619d1f2d333e9575297d0b73', val, 5));
  };

  useEffect(() => {
    dispatch(getCompanySpecificJobs('619d1f2d333e9575297d0b73', 1, 5));
  }, []);

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
    <>
      <EmployerNavbar />
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
                      {/* <JobCardExpanded selectedJob={selectedJobs} /> */}
                      Display applicant details redirection to their profile
                      page on click Change status of the applicant (Submitted,
                      reviewed, initial screening, Interviewing, Hired)
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
    </>
  );
}

export default FindJobs;
