import { toast } from 'react-toastify';
import { createToastBody, toastOptions } from '../../utils';
import {
  CLEAR_COMPANY_PROFILE_DATA,
  CLEAR_EXTERNAL_COMPANY_PROFILE,
  SET_COMPANY_PROFILE_DATA,
  SET_EXTERNAL_COMPANY_PROFILE,
} from './types';
import {
  getCompanyDetailsByEmployerId,
  getCompanyProfileByCompanyId,
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

export const setExternalCompanyProfileAction = (profileData) => ({
  type: SET_EXTERNAL_COMPANY_PROFILE,
  payload: profileData,
});

export const clearExternalCompanyProfileAction = () => ({
  type: CLEAR_EXTERNAL_COMPANY_PROFILE,
});

export const getExternalCompanyProfileAction = (companyId) => async (dispatch) => {
  try {
    const profile = await getCompanyProfileByCompanyId(companyId);
    dispatch(setExternalCompanyProfileAction(profile));
  } catch (error) {
    dispatch(clearExternalCompanyProfileAction());
  }
};
