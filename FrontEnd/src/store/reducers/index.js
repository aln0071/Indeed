import { combineReducers } from 'redux';
import user from './user';
import companyProfile from './companyProfile';
import message from './message';
import review from './review';
import jobs from './jobs';
import externalCompanyProfile from './externalCompanyProfile';
import findSalaries from './findSalaries';

export default combineReducers({
  user,
  companyProfile,
  message,
  jobs,
  review,
  externalCompanyProfile,
  findSalaries,
});
