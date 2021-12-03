import {
  GET_ALL_JOBS,
  GET_SPECIFIC_JOB,
  GET_SEARCHED_JOB,
  STORE_SEARCHED_RESULTS,
  POST_JOB,
  GET_COMPANY_SPECIFIC_JOBS,
} from '../actions/types';

const initialState = {
  allJobs: [],
  selectedJob: {},
  searchedJobs: {
    jobs: [],
  },
  // searchedJobs: [],
  companySpecificJobs: [],
  searchedValues: [],
  employerPostedJob: {},
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
    case STORE_SEARCHED_RESULTS:
      return {
        ...state,
        searchedValues: action.payload,
      };
    case POST_JOB:
      return {
        ...state,
        employerPostedJob: action.payload,
      };
    case GET_COMPANY_SPECIFIC_JOBS:
      return {
        ...state,
        companySpecificJobs: action.payload,
      };
    default:
      return state;
  }
};

export default jobs;
