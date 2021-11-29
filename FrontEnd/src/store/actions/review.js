/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import { postReviews } from '../../utils/endpoints';
import { POST_REVIEW } from './types';
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
