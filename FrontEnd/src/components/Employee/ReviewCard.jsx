/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import StarsIcon from '@mui/icons-material/Stars';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomRating from '../customComponents/Rating';
import { featureAReview } from '../../store/actions/review';

function ReviewCard(props) {
  const dispatch = useDispatch();
  // const userType = useSelector((state) => state.user.userType);
  const [featured, setFeatured] = useState(false);

  const feature = () => {
    if (featured) {
      setFeatured(false);
      dispatch(
        featureAReview({
          isFeatured: false,
          reviewId: props.review.reviewId,
          companyId: props.review.companyId,
        }),
      );
    } else {
      setFeatured(true);
      dispatch(
        featureAReview({
          isFeatured: true,
          reviewId: props.review.reviewId,
          companyId: props.review.companyId,
        }),
      );
    }
  };

  // useEffect(() => {

  // }, [])
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        marginBottom: '20px',
        background: props.color ? props.color : 'initial',
      }}
    >
      <CardContent style={{ display: 'flex' }}>
        <div style={{ width: '20%' }}>
          <Typography
            variant="h5"
            onClick={() => {
              // handleSelectJob();
            }}
            component="div"
            sx={{ fontWeight: 'bold' }}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            {props.review.rating}
          </Typography>
          <Typography
            variant="h5"
            onClick={() => {
              // handleSelectJob();
            }}
            component="div"
            sx={{ fontWeight: 'bold' }}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CustomRating value={props.review.rating} readOnly />
          </Typography>
        </div>
        <div style={{ width: '80%', paddingLeft: '20px' }}>
          <Typography
            variant="h5"
            onClick={() => {
              // handleSelectJob();
            }}
            component="div"
            sx={{ fontWeight: 'bold' }}
            style={{ cursor: 'pointer' }}
          >
            {props.review ? props.review.reviewTitle : 'Review Title'}
          </Typography>
          <Typography color="text.secondary">
            {props.review ? props.review.reviewerDesignation : 'Role'}
            {' '}
            {props.review ? props.review.reviewerCity : 'City'}
            {' '}
            {props.review ? props.review.reviewerState : 'State'}
            {' '}
            {' - '}
            {props.review ? props.review.reviewDate : 'Posted Date'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <p>{props.review.reviewDescription}</p>
          </Typography>
          {!props.isFeatured && (
            <Typography sx={{ mb: 1 }} color="text.primary">
              <p>
                Feature this review ?
                <IconButton
                  onClick={() => {
                    feature();
                  }}
                >
                  <StarsIcon />
                  {/* // style={{ color: featured ? 'yellowgreen' : 'black' }}/> */}
                </IconButton>
              </p>
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
ReviewCard.propTypes = {
  // ...prop type definitions here
  review: PropTypes.object,
  isFeatured: PropTypes.bool,
  color: PropTypes.string,
};
export default ReviewCard;
