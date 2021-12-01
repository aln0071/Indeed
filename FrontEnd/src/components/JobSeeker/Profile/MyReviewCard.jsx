/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CustomRating from '../../customComponents/Rating';

function ReviewCard(props) {
  return (
    <Card sx={{ minWidth: 275 }} style={{ marginBottom: '20px' }}>
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
          <Button onClick={() => props.handleReviewClick(props.review)}>
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
          </Button>
          <Typography color="text.secondary" style={{ paddingLeft: 10 }}>
            {props.review ? props.review.reviewerDesignation : 'Role'}
            {' '}
            {props.review ? props.review.reviewerCity : 'City'}
            {' '}
            {props.review ? props.review.reviewerState : 'State'}
            {' '}
            {' - '}
            {props.review ? props.review.reviewDate : 'Posted Date'}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            style={{ paddingLeft: 10 }}
          >
            <p>{props.review.reviewDescription}</p>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
ReviewCard.propTypes = {
  // ...prop type definitions here
  review: PropTypes.object,
  handleReviewClick: PropTypes.func,
};
export default ReviewCard;
