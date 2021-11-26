import { combineReducers } from 'redux';
import user from './user';
import companyProfile from './companyProfile';

export default combineReducers({
  user,
  companyProfile,
});
