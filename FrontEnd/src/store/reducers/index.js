import { combineReducers } from 'redux';
import user from './user';
import companyProfile from './companyProfile';
import jobs from './jobs';

export default combineReducers({
  user,
  companyProfile,
  jobs,
});
