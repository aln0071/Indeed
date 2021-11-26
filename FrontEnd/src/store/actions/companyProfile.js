import { toast } from 'react-toastify';
import { createToastBody, toastOptions } from '../../utils';
import { CLEAR_COMPANY_PROFILE_DATA, SET_COMPANY_PROFILE_DATA } from './types';
import { updateCompanyProfile } from '../../utils/endpoints';

export const setCompanyProfileAction = (profileData) => ({
  type: SET_COMPANY_PROFILE_DATA,
  payload: profileData,
});

export const clearCompanyProfileAction = () => ({
  type: CLEAR_COMPANY_PROFILE_DATA,
});

export const updateCompanyProfileAction = () => async (dispatch, getState) => {
  try {
    const profileData = getState().companyProfile;
    await updateCompanyProfile(profileData);
    toast.success('Success! Profile updated', toastOptions);
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
