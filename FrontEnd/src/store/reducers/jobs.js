import {
  GET_ALL_JOBS,
  GET_SPECIFIC_JOB,
  GET_SEARCHED_JOB,
} from '../actions/types';

const initialState = {
  allJobs: [],
  selectedJob: {},
  searchedJobs: [],
};

const jobs = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_ALL_JOBS:
      return {
        ...state,
        allJobs: action.payload,
      };
    case GET_SPECIFIC_JOB:
      return {
        ...state,
        selectedJob: action.payload,
      };
    case GET_SEARCHED_JOB:
      return {
        ...state,
        searchedJobs: action.payload,
      };
    default:
      return state;
  }
};

export default jobs;
