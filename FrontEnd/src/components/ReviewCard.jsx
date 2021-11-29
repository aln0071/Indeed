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

export default function ReviewCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="d-md-flex">
          <div style={{ width: '50px' }}>
            <Typography sx={{ fontSize: 24 }}>{props.data.rating}</Typography>
            <StarRateIcon
              style={{
                fontSize: '0.5rem',
                height: '10px',
              }}
            />
            <StarRateIcon
              style={{
                fontSize: '0.5rem',
                height: '10px',
              }}
            />
            <StarRateIcon
              style={{
                fontSize: '0.5rem',
                height: '10px',
              }}
            />
            <StarRateIcon
              style={{
                fontSize: '0.5rem',
                height: '10px',
              }}
            />
            <StarRateIcon
              style={{
                fontSize: '0.5rem',
                height: '10px',
              }}
            />
          </div>
          <div style={{ width: 'calc(100%-100px)' }}>
            <Typography sx={{ fontSize: 18, color: 'black' }}>
              {props.data.title}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              {`${props.data.writtenBy} ${props.data.country} ${props.data.date}`}
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50px' }} />
          <div style={{ padding: '0 20px' }}>
            <Typography sx={{ fontSize: 14, marginTop: 5 }}>
              {props.data.description}
            </Typography>

            <Typography sx={{ fontSize: 14, marginTop: 5, color: 'black' }}>
              <CheckIcon style={{ fontSize: 14, color: 'green' }} />
              {' '}
              Pros
            </Typography>
            <Typography sx={{ fontSize: 12, padding: 1 }}>
              People are nice
            </Typography>

            <Typography sx={{ fontSize: 14, marginTop: 1, color: 'black' }}>
              <CloseIcon style={{ fontSize: 14, color: 'red' }} />
              {' '}
              Cons
            </Typography>
            <Typography sx={{ fontSize: 12, padding: 1 }}>
              No work life balance. Stressful.
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            variant="contained"
            color="success"
            style={{ margin: '0 10px' }}
          >
            Approve
            {' '}
            <CheckCircleIcon style={{ height: '14px' }} />
          </Button>
          <Button variant="contained" color="error">
            Decline
            {' '}
            <CancelIcon style={{ height: '14px' }} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
