import {
  SET_EXTERNAL_COMPANY_PROFILE,
  CLEAR_EXTERNAL_COMPANY_PROFILE,
} from '../actions/types';

const initialState = {
  companyId: '',
  companyName: 'Amazon.com',
  pictures: [],
  logo: {},
};

const externalCompanyProfile = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_EXTERNAL_COMPANY_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_EXTERNAL_COMPANY_PROFILE:
      return { ...initialState };
    default:
      return state;
  }
};

export default externalCompanyProfile;
