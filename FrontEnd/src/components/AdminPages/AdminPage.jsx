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
import { baseUrl } from '../../utils/constants';

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
  const [currentTab, setCurrentTab] = React.useState();
  const [reviews, setReviews] = React.useState([]);
  const [showModel, setShowModel] = React.useState(false);
  const [modelMessage, setModelMessage] = React.useState('');
  const [reviewPerDay, setreviewPerDay] = React.useState(0);
  const [top5CompaniesCEO, setTop5CompaniesCEO] = React.useState([]);

  const [photos, setPhotos] = React.useState([]);

  const showConfirmationModel = (message) => {
    setShowModel(true);
    setModelMessage(message);
    setTimeout(() => {
      setShowModel(false);
    }, 2000);
  };

  const [top5ReviewedCompanies, setTop5ReviewedCompanies] = React.useState([]);
  const [top5CompaniesBasedOnAvgRating, setTop5CompaniesBasedOnAvgRating] = React.useState([]);

  function loadReviewPage() {
    return (
      <div className="cardWrapper" style={{ minWidth: '80%' }}>
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
    loadTop5CompaniesCEO();
  }, []);

  function loadTop5CompaniesCEO() {
    axios
      .get(
        `${baseUrl}indeed/api/admin/review/analytics?analytics=top5CEOBasedOnRating`,
      )
      .then((res) => {
        const response = res.data.map((d) => ({
          text: d.companyName,
          value: d.value,
        }));
        setTop5CompaniesCEO(response);
      });
  }
  function loadReviewPerDay() {
    axios
      .get(
        `${baseUrl}indeed/api/admin/review/analytics?analytics=`
          + 'reviewPerDay',
      )
      .then((res) => {
        setreviewPerDay(res.data.count);
      });
  }

  function loadTop5CompaniesBasedOnReview() {
    axios
      .get(
        `${baseUrl}indeed/api/admin/review/analytics?analytics=`
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
        `${baseUrl}indeed/api/admin/review/analytics?analytics=`
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
    axios.get(`${baseUrl}indeed/api/admin/get_all_reviews`).then((res) => {
      setReviews(res.data);
    });
  }

  function loadPhotosData() {
    axios.get(`${baseUrl}indeed/api/review/admin/getallphotos`).then((res) => {
      setPhotos(res.data);
    });
  }

  function loadPhotosPage() {
    return (
      <div className="imageCardWrapper">
        {photos.map((photo) => (
          <PhotosCard
            id={photo._id}
            pictureKey={photo.pictureKey}
            showConfirmationModel={showConfirmationModel}
          />
        ))}
      </div>
    );
  }

  function loadAnalyticsDashboard() {
    return (
      <div className="cardWrapper">
        <div className="d-md-flex justify-content-between">
          <div
            className="m-3 border"
            style={{
              height: '350px',
              width: '350px',
              background: '#fff',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              padding: '80px',
            }}
          >
            <p style={{ padding: '30px' }}>Total Reviews Today</p>
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
        </div>
        <div className="d-md-flex justify-content-between">
          <CustomBarChart data={top5CompaniesCEO} title="Top 5 CEO" />
          <CustomPieChart
            data={top5CompaniesBasedOnAvgRating}
            label="Top 5 companies based on average rating"
          />
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

        {/*  <Link
          id="FindSalaries"
          className="nav"
          onClick={() => manageTab('companies')}
        >
          Companies
        </Link> */}
      </div>
      <div className="subChild2">
        {currentTab || (
          <div className="cardWrapper" style={{ minWidth: '80%' }}>
            {reviews.map((review) => (
              <ReviewCard
                data={review}
                showConfirmationModel={showConfirmationModel}
              />
            ))}
          </div>
        )}
      </div>
      <Popup open={showModel} message={modelMessage} />
    </div>
  );
};

export default AdminHome;
