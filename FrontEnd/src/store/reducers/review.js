import { POST_REVIEW } from '../actions/types';

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
    default:
      return state;
  }
};

export default jobs;
