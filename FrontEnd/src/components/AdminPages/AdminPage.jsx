/* eslint-disable linebreak-style */
/* eslint-disable no-useless-concat */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import '../styles.css';
import { Link } from 'react-router-dom';
import ReviewCard from '../ReviewCard';
import axios from 'axios';
import PhotosCard from '../PhotoCard';
import CustomPieChart from '../CustomPieChart';
import CustomBarChart from '../CustomBarChart';
import Popup from '../Popup/Popup';

const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'initial',
    },
  },
  title: {
    fontSize: '50px',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: '35px',
    },
  },
}));
const color = ['#FFAF00', '#1BAA2F', '#007ED6', '#26D7AE', '#9C46D0'];
const AdminHome = () => {
  const [currentTab, setCurrentTab] = React.useState(loadReviewPage());
  const [reviews, setReviews] = React.useState([]);
  const [showModel, setShowModel] = React.useState(false);
  const [modelMessage, setModelMessage] = React.useState('');
  const [reviewPerDay, setreviewPerDay] = React.useState(0);

  const [photos, setPhotos] = React.useState([]);

  const showConfirmationModel = (message) => {
    setShowModel(true);
    setModelMessage(message);
    setTimeout(() => {
      setShowModel(false);
      setModelMessage('');
      loadReviewData();
    }, 2000);
  };

  const [top5ReviewedCompanies, setTop5ReviewedCompanies] = React.useState([]);

  const [top5CompaniesBasedOnAvgRating, setTop5CompaniesBasedOnAvgRating] = React.useState([]);

  function loadReviewPage() {
    return (
      <div className="cardWrapper">
        {reviews?.map((review) => (
          <ReviewCard
            data={review}
            showConfirmationModel={showConfirmationModel}
          />
        ))}
      </div>
    );
  }

  React.useEffect(() => {
    loadReviewData();
    loadPhotosData();
    loadTop5CompaniesBasedOnReview();
    loadTop5CompaniesBasedOnRatings();
    loadReviewPerDay();
  }, []);

  function loadReviewPerDay() {
    axios
      .get(
        'http://localhost:3003/indeed/api/admin/review/analytics?analytics='
          + 'reviewPerDay',
      )
      .then((res) => {
        setreviewPerDay(res.data.count);
      });
  }

  function loadTop5CompaniesBasedOnReview() {
    axios
      .get(
        'http://localhost:3003/indeed/api/admin/review/analytics?analytics='
          + 'top5ComapniesBasedOnReview',
      )
      .then((res) => {
        const response = res.data.map((entry, index) => ({
          title: entry.companyName,
          value: entry.value,
          color: color[index],
        }));
        setTop5ReviewedCompanies(response);
      });
  }

  function loadTop5CompaniesBasedOnRatings() {
    axios
      .get(
        'http://localhost:3003/indeed/api/admin/review/analytics?analytics='
          + 'top5CompaniesBasedOnRating',
      )
      .then((res) => {
        const response = res.data.map((entry, index) => ({
          title: entry.companyName,
          value: entry.value,
          color: color[index],
        }));
        setTop5CompaniesBasedOnAvgRating(response);
      });
  }

  function loadReviewData() {
    axios
      .get('http://localhost:3003/indeed/api/admin/get_all_reviews')
      .then((res) => {
        setReviews(res.data);
      });
  }

  function loadPhotosData() {
    axios.get('https://localhost:3003/photos').then((res) => {
      setPhotos(res.data);
    });
  }

  function loadPhotosPage() {
    return (
      <div className="imageCardWrapper">
        <PhotosCard />
      </div>
    );
  }

  function loadAnalyticsDashboard() {
    return (
      <div className="cardWrapper">
        <div className="d-md-flex justify-content-between">
          <div
            style={{
              border: '5px solid #1BAA2F',
              width: '200px',
              height: '200px',
              size: '32px',
              margin: 'auto',
            }}
          >
            <p style={{ padding: '30px' }}>Reviews Per day</p>
            <h3
              style={{
                fontSize: '32px',
                padding: '0px 78px',
                color: '#FFAF00',
              }}
            >
              {1}
            </h3>
          </div>

          <CustomPieChart
            data={top5ReviewedCompanies}
            label="Top 5 most reviewed companies"
          />
          <CustomPieChart
            data={top5CompaniesBasedOnAvgRating}
            label="Top 5 companies based on average rating"
          />
        </div>
        <div className="d-md-flex justify-content-between">
          <CustomBarChart />
          <CustomBarChart />
          <CustomBarChart />
        </div>
      </div>
    );
  }

  function manageTab(currentTab) {
    switch (currentTab) {
      case 'reviews':
        setCurrentTab(loadReviewPage());
        break;
      case 'photos':
        setCurrentTab(loadPhotosPage());
        break;
      case 'analyticalDashboard':
        setCurrentTab(loadAnalyticsDashboard());
        break;
    }
  }

  const classes = useStyles();
  return (
    <div>
      <JobSeekerNavbar />
      <div style={{ display: 'flex' }}>
        <Link className="nav" onClick={() => manageTab('reviews')}>
          Reviews
        </Link>
        <Link
          id="CompanyReviews"
          className="nav"
          onClick={() => manageTab('photos')}
        >
          Photos
        </Link>
        <Link
          id="FindSalaries"
          className="nav"
          onClick={() => manageTab('analyticalDashboard')}
        >
          Analytical Dashboard
        </Link>

        <Link
          id="FindSalaries"
          className="nav"
          onClick={() => manageTab('companies')}
        >
          Companies
        </Link>
      </div>
      <div className="subChild2">{currentTab}</div>
      <Popup open={showModel} message={modelMessage} />
    </div>
  );
};

export default AdminHome;
