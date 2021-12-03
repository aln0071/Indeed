import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import { styled } from '@mui/material/styles';
import axios from 'axios';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';
import { baseUrl, urls } from '../../../utils/constants';
import MyReviewCard from './MyReviewCard';
// import styles from '../styles.scss';
// import banner from '../images/banner.jpeg';
// import logo from '../images/cmplogo.jpeg';

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
  const [myReviewsResult, setMyReviewsResult] = useState([]);
  const history = useHistory();

  const handleReviewClick = (review) => {
    // TODO: Redirect to review Tab
    history.push(
      `/cmp/companyId/?companyId=${review.companyId}&tab=${'reviews'}`,
    );
  };

  const getMyReviews = async () => {
    // NOTE TODO: userID
    const url = `${baseUrl}${urls.getMyReviews}/74f7a890-50d0-11ec-997d-cf51c6971d1e`;
    const headers = {
      // Authorization: token,
    };
    try {
      const res = await axios.get(url, { headers });
      console.log('response', res.data);
      setMyReviewsResult(res.data);
      // await dispatch(updateCustomerProfile(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyReviews();
  }, []);
  return (
    <>
      <JobSeekerNavbar />
      {myReviewsResult.map((item) => (
        // eslint-disable-next-line react/no-array-index-key
        <MyReviewCard
          review={item}
          handleReviewClick={handleReviewClick}
          key={`review-${item.reviewId}`}
        />
      ))}
    </>
  );
}
