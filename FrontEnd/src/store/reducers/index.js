import { combineReducers } from 'redux';
import user from './user';
import companyProfile from './companyProfile';
import message from './message';

export default combineReducers({
  user,
  companyProfile,
  message,
});
