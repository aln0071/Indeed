import {
  CLEAR_COMPANY_PROFILE_DATA,
  SET_COMPANY_PROFILE_DATA,
} from '../actions/types';

const initialState = {};

const companyProfile = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_COMPANY_PROFILE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_COMPANY_PROFILE_DATA:
      return {};
    default:
      return state;
  }
};

export default companyProfile;
