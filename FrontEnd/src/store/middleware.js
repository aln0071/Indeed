/* eslint no-unused-vars: 0 */
const middleware = (store) => (next) => (action) => {
  next(action);
};

export default middleware;
