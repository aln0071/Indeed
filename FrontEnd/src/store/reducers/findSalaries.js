import {
  CLEAR_FIND_SALARIES_ACTION,
  SET_FIND_SALARIES_ACTION,
} from '../actions/types';

// const initialState = {
//   averageSalary: '43.64',
//   topCompanies: [
//     {
//       averageSalary: 60,
//       companyId: '61a95e06ffd11be365106427',
//       companyName: 'Tableau',
//       salaryReviewCount: 0
//     },
//     {
//       averageSalary: 60,
//       companyId: '61a32673a0660ee943876fc0',
//       averageRating: '2.67',
//       reviewCount: 3,
//       companyName: 'Adobe',
//       salaryReviewCount: 0
//     },
//     {
//       averageSalary: 60,
//       companyId: '61a32673a0660ee943876fc0',
//       companyName: 'Adobe',
//       salaryReviewCount: 0
//     },
//     {
//       averageSalary: 46.666666666666664,
//       companyId: '61a3227aa0660ee943876fa1',
//       averageRating: '3.50',
//       reviewCount: 2,
//       companyName: 'Google',
//       salaryReviewCount: 2
//     },
//     {
//       averageSalary: 25,
//       companyId: '619d1f2d333e9575297d0b73',
//       averageRating: '3.28',
//       reviewCount: 10,
//       companyName: 'Tableau',
//       salaryReviewCount: 2
//     }
//   ]
// }

const initialState = {};

const findSalaries = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_FIND_SALARIES_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_FIND_SALARIES_ACTION:
      return { ...initialState };
    default:
      return state;
  }
};

export default findSalaries;
