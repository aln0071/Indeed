/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
// import axios from 'axios';
// import StarIcon from '@material-ui/icons/Star';
import {
  Grid,
  Container,
  //   makeStyles,
  Typography,
  //   Button,
  //   withStyles,
} from '@material-ui/core';
// import { Redirect } from 'react-router-dom';
// import { ReviewBox } from '../Layout/Review/ReviewBox';
// import { getCompanyReviews } from '../../Redux/CompanyReviews/action';
// import Jobs from './Jobs';
import { baseUrl, urls } from '../../../utils/constants';
import MyJobCard from './MyJobCard';

export function AppliedJobs() {
  //   const classes = useStyle();
  const userId = useSelector((state) => state.user.userId);
  //   const [reviews, setReviews] = useState([]);
  const [myJobsResult, setMyJobsResult] = useState([]);

  const getMyJobs = async () => {
    // const url = `${baseUrl}${urls.getMyJobs}/1254`;
    const url = `${baseUrl}${urls.getMyJobs}/${userId}`;
    const headers = {
      // Authorization: token,
    };
    try {
      const res = await axios.get(url, { headers });
      console.log('response', res.data);
      setMyJobsResult(res.data);
      // await dispatch(updateCustomerProfile(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <div className="wrapper">
        <div className="cardWrapper">
          {myJobsResult.map((item, index) => (
            <p key={`myjob-${index}`}>
              <MyJobCard job={item} />
            </p>
          ))}
        </div>
      </div>
    </Box>
  );
}
