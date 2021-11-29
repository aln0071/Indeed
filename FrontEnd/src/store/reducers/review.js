import { POST_REVIEW, GET_REVIEW } from '../actions/types';

const initialState = {
  postedReview: {},
  allReviews: [],
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
    default:
      return state;
  }
};

export default jobs;
