import { toast } from 'react-toastify';
import { loginUser } from '../../utils/endpoints';
import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from './types';
import { createToastBody, toastOptions } from '../../utils';

const setUserDetailsAction = (userDetails) => ({
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
    history.push('/');
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const registerUserAction = () => {};
