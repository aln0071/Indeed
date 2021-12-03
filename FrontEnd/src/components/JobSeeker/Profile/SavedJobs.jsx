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

// const useStyle = makeStyles((theme) => ({
//   imgCont: {
//     padding: '5px',
//     borderRadius: '5px',
//     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
//   },
//   optionTab: {
//     cursor: 'pointer',
//     margin: '0 40px 0 40px',
//     '&:hover': {
//       borderBottom: '5px solid #397ff8',
//       fontWeight: 'bold',
//     },
//   },
// }));

const companyDetails = {
  id: 2,
  company: 'Amazon.com',
  logo: 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/62c36898c1fccfb889efeb7ccefb50b7',
  description:
    'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We are driven by the excitement of building technologies, inventing products, and providing services that change lives. We embrace new ways of doing things, make decisions quickly, and are not afraid to fail. We have the scope and capabilities of a large company, and the spirit and heart of a small one.',
  ceo_name: 'Jeff Bezos',
  ceo_image:
    'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455',
  founded_year: '1994',
  revenue: '$10B (USD)',
  company_size: '10,000',
  salaries: '10,580',
  photos: 174,
  jobs: 2005,
  questions: 19,
  ratings: 5,
};

export function SavedJobs() {
  const userId = useSelector((state) => state.user.userId);
  const [myJobsResult, setMyJobsResult] = useState([]);

  const getMyJobs = async () => {
    // const url = `/customers/${customerProfile?._id}/profile`;
    const url = `${baseUrl}indeed/api/jobseeker/${userId}/savedJobs`;
    try {
      const res = await axios.get(url);
      console.log('response', res.data);
      setMyJobsResult(res.data);
      // await dispatch(updateCustomerProfile(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyJobs();
    // setSearchResults(searchedJobs);
    // if (searchedJobs[0]) {
    //   dispatch(
    //     getSpecificJobAction('619d1f2d333e9575297d0b73', searchedJobs[0].jobId),
    //   );
    // }
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
