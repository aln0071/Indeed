/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import salarySvg from '../svg/salary.svg';

function JobCard() {
  // const { job } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="#9c2f5f" gutterBottom>
          new
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Senior Salesforce Administrator
        </Typography>
        <Typography color="text.secondary">SplashTop Inc. 4.5</Typography>
        <Typography color="text.secondary">Cupertino, CA 95014</Typography>
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
          $115,000 - $128,000 a Year
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <ul>
            <li>
              Manage Salesforce.com CRM including support requests and escalated
              administrative needs of users by providing prompt and complete
              resolution to technical challenges and business support issues.
            </li>
          </ul>
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
JobCard.propTypes = {
  // ...prop type definitions here
  job: PropTypes.array,
};
export default JobCard;
