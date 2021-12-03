import {
  POST_REVIEW,
  GET_REVIEW,
  FEATURE_A_REVIEW,
  GET_FEATURED_REVIEWS,
} from '../actions/types';

const initialState = {
  postedReview: {},
  allReviews: [],
  message: '',
  featured: [],
};

const jobs = (state = { ...initialState }, action) => {
  switch (action.type) {
    case POST_REVIEW:
      return {
        ...state,
        postedReview: action.payload,
      };
    case GET_REVIEW:
      return {
        ...state,
        allReviews: action.payload,
      };
    case FEATURE_A_REVIEW:
      return {
        ...state,
        message: action.payload,
      };
    case GET_FEATURED_REVIEWS:
      return {
        ...state,
        featured: action.payload,
      };
    default:
      return state;
  }
};

export default jobs;
