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

const Home = () => {
  const [currentTab, setCurrentTab] = React.useState(loadReviewPage());
  const [reviews, setReviews] = React.useState([
    {
      id: 1,
      rating: '4.0',
      title:
        'Similar to most reviews here: good place to learn but cannot stay long - burnout expedred',
      writtenBy: 'Business Analyst (Former Employee)',
      country: ' United States',
      date: 'November 26, 2021',
      description: `It’s not just a stereotype and burning out at Amazon doesn’t just
              apply to Amazon warehouse workers. Everything is on fire all the
              time, and you will be completely stressed out most of the time.
              It’s not worth it and life shouldn’t be that hard. You do learn a
              lot but they really don’t care about you.`,
      companies: 'Amazon',
    },
    {
      id: 1,
      rating: '3.5',
      title:
        'Similar to most reviews here: good place to learn but cannot stay long - burnout expedred',
      writtenBy: 'Business Analyst (Former Employee)',
      country: ' United States',
      date: 'November 26, 2021',
      description: `It’s not just a stereotype and burning out at Amazon doesn’t just
              apply to Amazon warehouse workers. Everything is on fire all the
              time, and you will be completely stressed out most of the time.
              It’s not worth it and life shouldn’t be that hard. You do learn a
              lot but they really don’t care about you.`,
      companies: 'Amazon',
    },
  ]);

  const [photos, setPhotos] = React.useState([]);

  const [top5ReviewedCompanies, setTop5ReviewedCompanies] = React.useState([
    {
      id: 1,
      title: 'Amazon',
      value: 150,
      color: 'black',
    },
    {
      id: 2,
      title: 'Google',
      value: 140,
      color: 'red',
    },
    {
      id: 3,
      title: 'Yahoo',
      value: 125,
      color: 'yellow',
    },
    {
      id: 4,
      title: 'Microsoft',
      value: 110,
      color: 'orange',
    },
    {
      id: 5,
      title: 'Netflix',
      value: 100,
      color: 'blue',
    },
  ]);

  const [top5CompaniesBasedOnAvgRating, setTop5CompaniesBasedOnAvgRating] = React.useState([
    {
      id: 1,
      title: 'Amazon',
      value: 5,
      color: 'black',
    },
    {
      id: 2,
      title: 'Google',
      value: 4,
      color: 'red',
    },
    {
      id: 3,
      title: 'Yahoo',
      value: 5,
      color: 'yellow',
    },
    {
      id: 4,
      title: 'Microsoft',
      value: 3,
      color: 'orange',
    },
    {
      id: 5,
      title: 'Netflix',
      value: 1,
      color: 'blue',
    },
  ]);

  function loadReviewPage() {
    return (
      <div className="cardWrapper">
        {reviews?.map((review) => (
          <ReviewCard data={review} />
        ))}
      </div>
    );
  }

  React.useEffect(() => {
    loadReviewData();
    loadPhotosData();
  }, []);

  function loadReviewData() {
    axios.get('https://localhost:3003/review').then((res) => {
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
          <CustomPieChart
            data={top5ReviewedCompanies}
            label="Top 5 most reviewed companies"
          />
          <CustomPieChart
            data={top5CompaniesBasedOnAvgRating}
            label="Top 5 companies based on average rating"
          />
          <CustomBarChart />
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
    </div>
  );
};

export default Home;
