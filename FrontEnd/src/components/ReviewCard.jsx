/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseUrl } from '../utils/constants';

export default function ReviewCard(props) {
  function handlAction(action) {
    axios
      .get(
        `${baseUrl}indeed/api/admin/review/action?approved=${action}&id=${props.data._id}`,
      )
      .then((result) => {
        props.showConfirmationModel(
          action == true
            ? 'Review has been approved'
            : 'Review has been declined',
        );
      });
  }

  function renderRating() {
    const stars = [];
    for (let i = 0; i < Math.round(props.data.rating); i++) {
      stars.push(
        <StarRateIcon
          style={{
            fontSize: '0.5rem',
            height: '10px',
          }}
        />,
      );
    }

    for (let i = 0; i < 5 - Math.round(props.data.rating); i++) {
      stars.push(
        <StarRateIcon
          style={{
            fontSize: '0.5rem',
            height: '10px',
            color: 'gray',
          }}
        />,
      );
    }

    return stars;
  }
  return (
    <Card sx={{ minWidth: 275 }} className="my-2">
      <CardContent>
        <div className="d-md-flex">
          <div style={{ width: '50px' }}>
            <Typography sx={{ fontSize: 24 }}>
              {Math.round(props.data.rating)}
            </Typography>
            {renderRating()}
          </div>
          <div style={{ width: 'calc(100%-100px)' }}>
            <Typography sx={{ fontSize: 18, color: 'black' }}>
              {props.data.reviewTitle}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              {/* ${props.data.userId} ${props.data.country} */}
              {` ${new Date(parseInt(props.data.reviewDate))}`}
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50px' }} />
          <div style={{ padding: '0 20px' }}>
            <Typography sx={{ fontSize: 14, marginTop: 5 }}>
              {props.data.reviewDescription}
            </Typography>

            <Typography sx={{ fontSize: 14, marginTop: 5, color: 'black' }}>
              <CheckIcon style={{ fontSize: 14, color: 'green' }} />
              {' '}
              Pros
            </Typography>
            <Typography sx={{ fontSize: 12, padding: 1 }}>
              {props.data.whatPeopleLiked}
            </Typography>

            <Typography sx={{ fontSize: 12, padding: 1 }}>
              {props.data.learning}
            </Typography>

            <Typography sx={{ fontSize: 14, marginTop: 1, color: 'black' }}>
              <CloseIcon style={{ fontSize: 14, color: 'red' }} />
              {' '}
              Cons
            </Typography>
            <Typography sx={{ fontSize: 12, padding: 1 }}>
              {props.data.areasOfImprovement}
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            variant="contained"
            color="success"
            style={{ margin: '0 10px' }}
            onClick={() => handlAction(true)}
          >
            Approve
            {' '}
            <CheckCircleIcon style={{ height: '14px' }} />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handlAction(false)}
          >
            Decline
            {' '}
            <CancelIcon style={{ height: '14px' }} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
