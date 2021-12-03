/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
// import axios from 'axios';
// import StarIcon from '@material-ui/icons/Star';
import {
  Grid,
  Container,
  //   makeStyles,
  Typography,
  //   Button,
  //   withStyles,
} from '@material-ui/core';
// import { Redirect } from 'react-router-dom';
// import { ReviewBox } from '../Layout/Review/ReviewBox';
// import { getCompanyReviews } from '../../Redux/CompanyReviews/action';
// import Jobs from './Jobs';

// const useStyle = makeStyles((theme) => ({
//   imgCont: {
//     padding: '5px',
//     borderRadius: '5px',
//     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
//   },
//   optionTab: {
//     cursor: 'pointer',
//     margin: '0 40px 0 40px',
//     '&:hover': {
//       borderBottom: '5px solid #397ff8',
//       fontWeight: 'bold',
//     },
//   },
// }));

const companyDetails = {
  id: 2,
  company: 'Amazon.com',
  logo: 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/62c36898c1fccfb889efeb7ccefb50b7',
  description:
    'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We are driven by the excitement of building technologies, inventing products, and providing services that change lives. We embrace new ways of doing things, make decisions quickly, and are not afraid to fail. We have the scope and capabilities of a large company, and the spirit and heart of a small one.',
  ceo_name: 'Jeff Bezos',
  ceo_image:
    'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D560%26cropX2%3D1783%26cropY1%3D231%26cropY2%3D1455',
  founded_year: '1994',
  revenue: '$10B (USD)',
  company_size: '10,000',
  salaries: '10,580',
  photos: 174,
  jobs: 2005,
  questions: 19,
  ratings: 5,
};

export function Snapshot() {
  //   const classes = useStyle();
  //   const companyDetails = useSelector((state) => state.companies.currentCompany);
  //   const [reviews, setReviews] = useState([]);
  //   const query = new URLSearchParams(props.location.search);
  //   const id = query.get('id');
  //   const dispatch = useDispatch();
  const companyProfile = useSelector((state) => state.externalCompanyProfile);
  return (
    <Container maxwidth="xl">
      <Grid item style={{ marginTop: '20px', marginBottom: '30px' }}>
        <Typography variant="caption">
          {companyProfile.companyName || companyDetails.company}
          {' '}
          Careers and
          Employment
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '20px', marginBottom: '50px' }}>
        <Typography variant="h4">
          <b>About the company</b>
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item style={{ flex: 1 }}>
          <img
            src={companyDetails.ceo_image}
            alt={companyProfile.ceoName || companyDetails.ceo_name}
            style={{ height: '350px', width: '200px', borderRadius: '10px' }}
          />
        </Grid>
        <Grid container item style={{ flex: 0.5, flexDirection: 'column' }}>
          <Grid
            item
            xl={6}
            lg={6}
            style={{
              border: '2px solid #f2f2f2',
              borderRadius: '10px',
              padding: '20px',
              width: 150,
              height: 150,
            }}
          >
            <div style={{ fontWeight: '600' }}>CEO</div>
            <br />
            <br />
            <div>{companyProfile.ceoName || companyDetails.ceo_name}</div>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            style={{
              border: '2px solid #f2f2f2',
              borderRadius: '10px',
              padding: '20px',
              width: 150,
              height: 150,
            }}
          >
            <div style={{ fontWeight: '600' }}>Revenue</div>
            <br />
            <br />
            <div>{companyProfile.revenue || companyDetails.revenue}</div>
          </Grid>
        </Grid>
        <Grid container item style={{ flex: 0.5, flexDirection: 'column' }}>
          <Grid
            item
            xl={6}
            lg={6}
            style={{
              border: '2px solid #f2f2f2',
              borderRadius: '10px',
              padding: '20px',
              width: 150,
              height: 150,
            }}
          >
            <div style={{ fontWeight: '600' }}>Founded</div>
            <br />
            <br />
            <div style={{}}>
              {companyProfile.founded || companyDetails.founded_year}
            </div>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            style={{
              border: '2px solid #f2f2f2',
              borderRadius: '10px',
              padding: '20px',
              width: 150,
              height: 150,
            }}
          >
            <div style={{ fontWeight: '600' }}>Company size</div>
            <br />
            <br />
            <div style={{}}>
              more than
              <br />
              {companyProfile.companySize || companyDetails.company_size}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ justifyContent: 'center', padding: '40px' }}>
        <Typography
          variant="body2"
          style={{ color: '#767676', textAlign: 'left' }}
        >
          {companyProfile.aboutUs || companyDetails.description}
        </Typography>
      </Grid>
      <Typography
        variant="h5"
        style={{ color: '#085ff7', fontWeight: '600', cursor: 'pointer' }}
      >
        Learn More ＞
      </Typography>
    </Container>
  );
}
