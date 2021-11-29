/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
// import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import StarRateIcon from '@mui/icons-material/StarRate';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import { getSpecificJobAction } from '../store/actions/jobs';
// import salarySvg from '  ../svg/salary.svg';
import salarySvg from '../../../svg/salary.svg';

function JobCard(props) {
  // const dispatch = useDispatch();
  // const handleSelectJob = () => {
  //   dispatch(getSpecificJobAction('619d1f2d333e9575297d0b73', props.job.jobId));
  // };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 12 }} color="#9c2f5f" gutterBottom>
          new
        </Typography> */}
        <Typography
          variant="h5"
          onClick={() => {
            // handleSelectJob();
          }}
          component="div"
          sx={{ fontWeight: 'bold' }}
          style={{ cursor: 'pointer' }}
        >
          {props.job.jobTitle}
        </Typography>
        <Typography color="text.secondary">
          SplashTop Inc. 4.5
          <StarRateIcon
            style={{
              position: 'relative',
              top: '3px',
              left: '3px',
              height: '20px',
            }}
          />
        </Typography>
        <Typography
          sx={{ mt: 2 }}
          color="#595959"
          style={{ width: 'fit-content', background: '#f3f2f1' }}
        >
          <img
            src={salarySvg}
            width="20"
            height="20"
            alt=""
            style={{
              height: '15px',
              textAlign: 'center',
              width: 'fit-content',
            }}
          />
          {' '}
          $
          {props.job.jobSalary}
          {' '}
          a Year
        </Typography>
        {/* <Typography color="text.secondary">
          {props.job.address.city ? props.job.address.city : ''}
          {' '}
          {props.job.address.state ? props.job.address.state : ''}
          {' '}
          {props.job.address.zipcode ? props.job.address.zipcode : ''}
        </Typography> */}
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <ul>
            <li>
              Manage Salesforce.com CRM including support requests and escalated
              administrative needs of users by providing prompt and complete
              resolution to technical challenges and business support issues.
            </li>
          </ul>
        </Typography> */}
      </CardContent>
    </Card>
  );
}
JobCard.propTypes = {
  // ...prop type definitions here
  job: PropTypes.object,
};
export default JobCard;
