import { UPLOAD_RESUME } from '../actions/types';

const initialState = {
  resumeKey: '',
};

const jobs = (state = { ...initialState }, action) => {
  switch (action.type) {
    case UPLOAD_RESUME:
      return {
        ...state,
        resumeKey: action.payload,
      };
    default:
      return state;
  }
};

export default jobs;
