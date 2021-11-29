import React from 'react';
// import { Button } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import { styled } from '@mui/material/styles';
import JobSeekerNavbar from '../components/Navbars/JobSeekerNavbar';
// import styles from '../styles.scss';
// import banner from '../images/banner.jpeg';
// import logo from '../images/cmplogo.jpeg';
import MyJobsTabs from '../components/JobSeeker/Profile/MyJobsTabs';

// const StyledRating = styled(Rating)({
//   '& .MuiRating-iconFilled': {
//     color: 'white',
//   },
//   '& .MuiRating-iconHover': {
//     color: '#ff3d47',
//   },
//   '& .MuiRating-iconEmpty': {
//     color: 'white',
//   },
// });

export default function CompanyProfileJobSeeker() {
  return (
    <>
      <JobSeekerNavbar />
      <MyJobsTabs />
    </>
  );
}
