import { combineReducers } from 'redux';
import user from './user';
import companyProfile from './companyProfile';
import message from './message';
import review from './review';
import jobs from './jobs';

export default combineReducers({
  user,
  companyProfile,
  message,
  jobs,
  review,
});
