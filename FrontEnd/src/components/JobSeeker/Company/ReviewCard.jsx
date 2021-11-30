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
// import { getSpecificJobAction } from '../store/actions/jobs';
// import salarySvg from '../svg/salary.svg';

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
            4.5
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
            <CustomRating value={4.5} readOnly />
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
            {props.review ? props.review.role : 'Role'}
            {' '}
            {props.review ? props.review.address.city : 'City'}
            {' '}
            {props.review ? props.review.address.state : 'State'}
            {' '}
            {props.review ? props.review.address.zipcode : 'Zipcode'}
            {' - '}
            {props.review ? props.review.date : 'Posted Date'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <p>
              Manage Salesforce.com CRM including support requests and escalated
              administrative needs of users by providing prompt and complete
              resolution to technical challenges and business support issues.
            </p>
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
