import { toast } from 'react-toastify';
import { createToastBody, toastOptions } from '../../utils';
import { CLEAR_COMPANY_PROFILE_DATA, SET_COMPANY_PROFILE_DATA } from './types';
import {
  getCompanyDetailsByEmployerId,
  updateCompanyProfile,
} from '../../utils/endpoints';

export const setCompanyProfileAction = (profileData) => ({
  type: SET_COMPANY_PROFILE_DATA,
  payload: profileData,
});

export const clearCompanyProfileAction = () => ({
  type: CLEAR_COMPANY_PROFILE_DATA,
});

export const getCompanyProfileForEmployerAction = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const companyProfile = await getCompanyDetailsByEmployerId(user.userId);
    if (JSON.stringify(companyProfile) === '{}') {
      dispatch(clearCompanyProfileAction());
    } else {
      dispatch(setCompanyProfileAction(companyProfile));
    }
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
    dispatch(clearCompanyProfileAction());
  }
};

export const updateCompanyProfileAction = () => async (dispatch, getState) => {
  try {
    const profileData = getState().companyProfile;
    const { user } = getState();
    await updateCompanyProfile({ ...profileData, employerId: user.userId });
    toast.success('Success! Profile updated', toastOptions);
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
