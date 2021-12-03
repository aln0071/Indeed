/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  getReviewAction,
  getFeaturedReviewsAction,
} from '../../store/actions/review';
import ReviewCard from './ReviewCard';
import EmployerNavbar from '../Navbars/EmployerNavbar';
import CustomPagination from '../customComponents/Pagination';
import { getCompanyDetailsByEmployerId } from '../../utils/endpoints';
import { createToastBody, toastOptions } from '../../utils';

import '../styles.css';

const useStyles = makeStyles(() => ({
  searchContainer: {
    margin: '40px 0',
  },
  icon: {
    position: 'relative',
    left: '3px',
    height: '20px',
    color: '#2D2D2D',
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
}));

function Reviews() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allReviews = useSelector((state) => state.review.allReviews);
  const featured = useSelector((state) => state.review.featured);
  const history = useHistory();
  const [helpful, setHelpful] = useState(false);
  const [rating, setRating] = useState(false);
  const [date, setDate] = useState(false);
  const [all, setAll] = useState(true);
  const [asc, setAsc] = useState(true);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [allFeatured, setAllFeatured] = useState(featured);
  const [allCompanyReviews, setAllCompanyReviews] = useState(
    allReviews.reviews,
  );

  const [companyId, setCompanyId] = useState('');

  useEffect(async () => {
    try {
      const companyDetails = await getCompanyDetailsByEmployerId(user.userId);
      if (JSON.stringify(companyDetails) === '{}') {
        history.push('/company-profile');
        toast.info('Create a company profile first', toastOptions);
      } else {
        setCompanyId(companyDetails.companyId);
        dispatch(
          getFeaturedReviewsAction({
            companyId: companyDetails.companyId,
            userId: undefined,
          }),
        );
      }
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     getFeaturedReviewsAction({
  //       companyId: '61a32673a0660ee943876fc0',
  //       userId: undefined,
  //     }),
  //   );
  // }, []);

  useEffect(() => {
    setAllFeatured(featured);
  }, [featured]);

  useEffect(() => {
    const params = {
      companyId,
      userId: user.userId,
      sort: all ? '' : helpful ? 'helpful' : date ? 'date' : 'rating',
      order: asc ? 'asc' : 'desc',
      page: page || 1,
      limit: 5,
    };
    if (companyId) {
      dispatch(getReviewAction(params));
    }
  }, [asc, companyId]);

  useEffect(() => {
    setAllCompanyReviews(allReviews.reviews);
    setMeta(allReviews.metadata);
  }, [allReviews]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, val) => {
    setPage(val);
    const params = {
      companyId,
      userId: user.userId,
      sort: all ? '' : helpful ? 'helpful' : date ? 'date' : 'rating',
      order: asc ? 'asc' : 'desc',
      page: val || 1,
      limit: 5,
    };
    dispatch(getReviewAction(params));
  };

  const handleHelpful = () => {
    setHelpful(true);
    setRating(false);
    setDate(false);
    setAll(false);
    const params = {
      companyId,
      userId: user.userId,
      sort: 'helpful',
      order: asc ? 'asc' : 'desc',
      page: page || 1,
      limit: 5,
    };
    dispatch(getReviewAction(params));
  };
  const handleRating = () => {
    setHelpful(false);
    setRating(true);
    setDate(false);
    setAll(false);
    const params = {
      companyId,
      userId: user.userId,
      sort: 'rating',
      order: asc ? 'asc' : 'desc',
      page: page || 1,
      limit: 5,
    };
    dispatch(getReviewAction(params));
  };
  const handleDate = () => {
    setHelpful(false);
    setRating(false);
    setDate(true);
    setAll(false);
    const params = {
      companyId,
      userId: user.userId,
      sort: 'date',
      order: asc ? 'asc' : 'desc',
      page: page || 1,
      limit: 5,
    };
    dispatch(getReviewAction(params));
  };
  const handleAll = () => {
    setHelpful(false);
    setRating(false);
    setDate(false);
    setAll(true);
    const params = {
      companyId,
      userId: user.userId,
      sort: '',
      order: asc ? 'asc' : 'desc',
      page: page || 1,
      limit: 5,
    };
    dispatch(getReviewAction(params));
  };
  const handleAsc = () => {
    setAsc(!asc);
  };
  return (
    <>
      <EmployerNavbar />
      <div style={{ margin: '20px' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <div className={classes.wrapper}>
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              style={{ marginBottom: '20px' }}
            >
              <Button
                className={classes.root}
                style={{
                  background: all ? '#595959' : 'initial',
                  color: all ? 'white' : 'initial',
                }}
                onClick={handleAll}
              >
                All
              </Button>
              <Button
                className={classes.root}
                style={{
                  background: helpful ? '#595959' : 'initial',
                  color: helpful ? 'white' : 'initial',
                }}
                onClick={handleHelpful}
              >
                Helpful
              </Button>
              <Button
                className={classes.root}
                style={{
                  background: rating ? '#595959' : 'initial',
                  color: rating ? 'white' : 'initial',
                }}
                onClick={handleRating}
              >
                Rating
              </Button>
              <Button
                className={classes.root}
                style={{
                  background: date ? '#595959' : 'initial',
                  color: date ? 'white' : 'initial',
                }}
                onClick={handleDate}
              >
                Date
              </Button>
              <Button className={classes.root} onClick={handleAsc}>
                {asc ? (
                  <ArrowUpwardIcon className={classes.icon} />
                ) : (
                  <ArrowDownwardIcon className={classes.icon} />
                )}
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '50%' }}>
              {allCompanyReviews
                && allCompanyReviews.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ReviewCard review={item} key={`review-${item.reviewId}`} />
                ))}
              <CustomPagination
                count={meta ? meta.totalPages : 0}
                page={page}
                handleChangePage={handleChangePage}
              />
            </div>
            <div style={{ width: '50%', marginLeft: '20px' }}>
              <h2>Featured Reviews</h2>
              {allFeatured
                && allFeatured.featuredReviews
                && allFeatured.featuredReviews.length > 0
                && allFeatured.featuredReviews.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ReviewCard
                    review={item}
                    key={`featured-${item.reviewId}`}
                    isFeatured
                    color="thistle"
                  />
                ))}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Reviews;
