import { findSalaries } from '../../utils/endpoints';
import { SET_FIND_SALARIES_ACTION, CLEAR_FIND_SALARIES_ACTION } from './types';

const setFindSalariesAction = (data) => ({
  type: SET_FIND_SALARIES_ACTION,
  payload: data,
});

export const clearFindSalariesAction = () => ({
  type: CLEAR_FIND_SALARIES_ACTION,
});

export const findSalariesAction = (what, where) => async (dispatch) => {
  try {
    const salaries = await findSalaries(what, where);
    dispatch(setFindSalariesAction(salaries));
  } catch (error) {
    dispatch(clearFindSalariesAction());
  }
};
