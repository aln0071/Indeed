/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { Hidden, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
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
import { baseUrl } from '../../utils/constants';

const internalStatus = [
  {
    key: 'submitted',
    value: 'Submitted',
  },
  {
    key: 'reviewed',
    value: 'Reviewed',
  },
  {
    key: 'interviewing',
    value: 'Interviewing',
  },
  {
    key: 'hired',
    value: 'Hired)',
  },
];
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
  const [applicants, setApplicants] = useState([]);
  const [status, setStatus] = useState('Submitted');

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const [companyId, setCompanyId] = useState('');

  const handleChangePage = (event, val) => {
    setPage(val);
    dispatch(getCompanySpecificJobs(companyId, val, 5));
  };

  const onChange = async (e, item) => {
    const payload = {
      userId: item.jobSeekerId,
      jobId: specificJob.job.jobId,
      internalStatus: e.target.value,
    };
    const response = await axios.post(
      `${baseUrl}indeed/api/jobs/applicantstatus`,
      payload,
    );
  };

  useEffect(() => {
    if (companyId) {
      dispatch(getCompanySpecificJobs(companyId, 1, 5));
    }
  }, [companyId]);

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
    if (searchedJobs.reviews && searchedJobs.reviews[0] && companyId) {
      dispatch(getSpecificJobAction(companyId, searchedJobs.reviews[0].jobId));
    }
  }, [searchedJobs, companyId]);

  useEffect(() => {
    setSelectedJobs(specificJob);
    if (specificJob.job) {
      setApplicants(specificJob.job.applicantDetails);
    }
  }, [specificJob]);

  const onApplicantSelect = (item) => {
    sessionStorage.setItem('selectedUser', item.jobSeekerId);
    history.push('/employer/JobseekerProfile');
  };

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
                    </p>
                    {applicants
                      && applicants.length > 0
                      && applicants.map((item, index) => (
                        <Card
                          sx={{ minWidth: 700, minHeight: 150 }}
                          style={{ marginBottom: '20px' }}
                        >
                          <CardContent style={{ display: 'flex' }}>
                            <Avatar
                              alt="Your Name"
                              sx={{ width: '56px', height: '56px' }}
                              {...stringAvatar(item.jobSeekerName)}
                            />
                            <div
                              style={{ marginLeft: '20px', cursor: 'pointer' }}
                              onClick={() => onApplicantSelect(item)}
                            >
                              <h1 style={{ margin: 0, lineHeight: 'normal' }}>
                                {item.jobSeekerName}
                              </h1>
                              <p style={{ margin: 0 }}>San Jose, CA</p>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                              <TextField
                                margin="none"
                                required
                                fullWidth
                                value={status}
                                onChange={(e) => {
                                  onChange(e, item);
                                  setStatus(e.target.value);
                                }}
                                type="text"
                                id="category"
                                label="Applicant Status"
                                name="category"
                                autoComplete="category"
                                autoFocus
                                select
                              >
                                {internalStatus.map((option) => (
                                  <MenuItem
                                    key={option.key}
                                    value={option.value}
                                  >
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
