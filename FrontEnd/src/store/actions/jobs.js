import { toast } from 'react-toastify';
import {
  getAllJobs,
  getSpecificJob,
  getSearchedJobs,
  getCompanyJobs,
  postJob,
  saveJob,
  unsaveJob,
  applyForaJob,
} from '../../utils/endpoints';
import {
  GET_ALL_JOBS,
  GET_SPECIFIC_JOB,
  GET_SEARCHED_JOB,
  GET_COMPANY_SPECIFIC_JOBS,
  // SAVE_JOB,
  // UNSAVE_JOB,
  STORE_SEARCHED_RESULTS,
  POST_JOB,
} from './types';
import { createToastBody, toastOptions } from '../../utils';

export const getAllJobsAction = (page, limit) => async (dispatch) => {
  try {
    const response = await getAllJobs({ page, limit });
    dispatch({
      type: GET_ALL_JOBS,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getSpecificJobAction = (companyId, jobId) => async (dispatch) => {
  try {
    const response = await getSpecificJob({ companyId, jobId });
    dispatch({
      type: GET_SPECIFIC_JOB,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getSearchedJobsAction = (what, where, page, limit) => async (dispatch) => {
  try {
    const response = await getSearchedJobs({
      what,
      where,
      page,
      limit,
    });
    dispatch({
      type: GET_SEARCHED_JOB,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const saveJobAction = (jobId) => async () => {
  try {
    await saveJob({ jobId });
    toast.success('Saved Successfully', toastOptions);
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const unsaveJobAction = (jobId) => async () => {
  try {
    await unsaveJob({ jobId });
    toast.success('Un-saved Successfully', toastOptions);
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const storeSearchedAction = (searchResults) => async (dispatch) => {
  dispatch({
    type: STORE_SEARCHED_RESULTS,
    payload: searchResults,
  });
};

export const postEmployerJob = (job) => async (dispatch) => {
  const response = await postJob(job);
  dispatch({
    type: POST_JOB,
    payload: response,
  });
};

export const getCompanySpecificJobs = (companyId, page, limit) => async (dispatch) => {
  try {
    const response = await getCompanyJobs({ companyId, page, limit });
    dispatch({
      type: GET_COMPANY_SPECIFIC_JOBS,
      payload: response,
    });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const applyAction = (params) => async () => {
  try {
    await applyForaJob(params);
    // dispatch({
    //   type: APPLY_FOR_JOB,
    //   payload: response,
    // });
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
