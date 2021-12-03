/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
// export default Products;
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EmployerNavbar from '../Navbars/EmployerNavbar';
import CustomPagination from '../customComponents/Pagination';
import JobCard from '../JobCard';
import JobCardExpanded from '../JobCardExpanded';
import {
  getSpecificJobAction,
  getCompanySpecificJobs,
} from '../../store/actions/jobs';
import { getCompanyDetailsByEmployerId } from '../../utils/endpoints';
import { createToastBody, toastOptions } from '../../utils';
import '../styles.css';

function FindJobs() {
  const dispatch = useDispatch();
  const specificJob = useSelector((state) => state.jobs.selectedJob);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const searchedJobs = useSelector((state) => state.jobs.companySpecificJobs);
  const [meta, setMeta] = useState({});

  const [page, setPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState(specificJob);
  const [searchResults, setSearchResults] = useState(searchedJobs);

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const handleChangePage = (event, val) => {
    setPage(val);
    dispatch(getCompanySpecificJobs('619d1f2d333e9575297d0b73', val, 5));
  };

  useEffect(() => {
    dispatch(getCompanySpecificJobs('619d1f2d333e9575297d0b73', 1, 5));
  }, []);

  const [companyId, setCompanyId] = useState('');

  useEffect(async () => {
    try {
      const companyDetails = await getCompanyDetailsByEmployerId(user.userId);
      if (JSON.stringify(companyDetails) === '{}') {
        history.push('/company-profile');
        toast.info('Create a company profile first', toastOptions);
      } else {
        setCompanyId(companyDetails.companyId);
      }
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  }, []);

  useEffect(() => {
    setSearchResults(searchedJobs.reviews);
    setMeta(searchedJobs.metadata);
    if (searchedJobs.reviews && searchedJobs.reviews[0]) {
      dispatch(
        getSpecificJobAction(
          '619d1f2d333e9575297d0b73',
          searchedJobs.reviews[0].jobId,
        ),
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
                      {/* <JobCardExpanded selectedJob={selectedJobs} /> */}
                      Display applicant details redirection to their profile
                      page on click Change status of the applicant (Submitted,
                      reviewed, initial screening, Interviewing, Hired)
                    </p>
                    <Card
                      sx={{ minWidth: 700, minHeight: 150 }}
                      style={{ marginBottom: '20px' }}
                    >
                      <CardContent style={{ display: 'flex' }}>
                        <Avatar
                          alt="Your Name"
                          sx={{ width: '56px', height: '56px' }}
                          {...stringAvatar('Your Name')}
                        />
                        <div style={{ marginLeft: '20px' }}>
                          <h1 style={{ margin: 0, lineHeight: 'normal' }}>
                            Your Name
                          </h1>
                          <p style={{ margin: 0 }}>San Jose, CA</p>
                        </div>
                      </CardContent>
                    </Card>
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
    </>
  );
}

export default FindJobs;
