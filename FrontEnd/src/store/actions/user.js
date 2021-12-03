import { toast } from 'react-toastify';
import {
  getUserDetailsWithId,
  loginUser,
  getUserData,
} from '../../utils/endpoints';
import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from './types';
import { createToastBody, toastOptions } from '../../utils';

export const setUserDetailsAction = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const clearUserDetailsAction = () => ({
  type: CLEAR_USER_DETAILS,
});

export const loginUserAction = (email, password, history) => async (dispatch) => {
  try {
    const response = await loginUser({ email, password });
    dispatch(setUserDetailsAction(response));
    if (response.userType === 'jobseeker') {
      history.push('/');
    } else if (response.userType === 'admin') {
      history.push('/AdminHome');
    } else {
      history.push('/CompanyProfileEmployerLandingPage');
    }
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getUserDetailsWithIdAction = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().state.user;
    const response = await getUserDetailsWithId(userId);
    dispatch(setUserDetailsAction(response));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getProfileAction = (userId) => async (dispatch) => {
  try {
    // const { userId } = getState().state.user;
    const response = await getUserData(userId);
    dispatch(setUserDetailsAction(response));
  } catch (error) {
    toast.info('Please update some data in the profile first', toastOptions);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const registerUserAction = () => {};
