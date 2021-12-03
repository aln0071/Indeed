/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import {
  postReviews,
  getReviews,
  makeReviewFeatured,
  getFeaturedReviews,
} from '../../utils/endpoints';
import {
  POST_REVIEW,
  GET_REVIEW,
  FEATURE_A_REVIEW,
  GET_FEATURED_REVIEWS,
} from './types';
import { createToastBody, toastOptions } from '../../utils';

export const postReviewAction = (params) => async (dispatch) => {
  try {
    const response = await postReviews(params);
    dispatch({
      type: POST_REVIEW,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getReviewAction = (params) => async (dispatch) => {
  try {
    const response = await getReviews(params);
    dispatch({
      type: GET_REVIEW,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const featureAReview = (params) => async (dispatch) => {
  try {
    const response = await makeReviewFeatured(params);
    dispatch({
      type: FEATURE_A_REVIEW,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getFeaturedReviewsAction = (params) => async (dispatch) => {
  try {
    const response = await getFeaturedReviews(params);
    dispatch({
      type: GET_FEATURED_REVIEWS,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
