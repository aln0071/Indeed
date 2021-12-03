/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
          <Typography sx={{ mb: 1 }} color="text.primary">
            <p>
              Was this Review Helpful ?
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Yes"
                />
                <FormControlLabel control={<Checkbox />} label="No" />
              </FormGroup>
            </p>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
ReviewCard.propTypes = {
  // ...prop type definitions here
  review: PropTypes.object,
};
export default ReviewCard;
