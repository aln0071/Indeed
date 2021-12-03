/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomRating from '../../customComponents/Rating';
import { reviewHelpful } from '../../../store/actions/review';

function ReviewCard(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const [checkedAlt, setCheckedAlt] = useState(false);
  const userType = useSelector((state) => state.user.userType);
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
            {props.review
              ? new Date(
                parseInt(props.review.reviewDate, 10),
              ).toLocaleDateString()
              : 'Posted Date'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <p>{props.review.reviewDescription}</p>
          </Typography>
          {!props.isFeatured && (
            <Typography sx={{ mb: 1 }} color="text.primary">
              <p>
                Was this Review Helpful ?
                <FormGroup>
                  <FormControlLabel
                    label="Yes"
                    checked={checked}
                    control={<Checkbox />}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if (e.target.checked) {
                        setCheckedAlt(false);
                        dispatch(
                          reviewHelpful({
                            helpfulnessPositive: 1,
                            reviewId: props.review.reviewId,
                          }),
                        );
                      } else {
                        setCheckedAlt(true);
                      }
                    }}
                  />
                  <FormControlLabel
                    checked={checkedAlt}
                    control={<Checkbox />}
                    label="No"
                    onChange={(e) => {
                      setCheckedAlt(e.target.checked);
                      if (e.target.checked) {
                        setChecked(false);
                        dispatch(
                          reviewHelpful({
                            helpfulnessNegative: 1,
                            reviewId: props.review.reviewId,
                          }),
                        );
                      } else {
                        setChecked(true);
                      }
                    }}
                  />
                </FormGroup>
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
