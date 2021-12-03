import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ path, component }) {
  if (useSelector((state) => state.user.userId)) {
    return <Route exact path={path} component={component} />;
  }
  return <Redirect to="/login" />;
}

ProtectedRoute.defaultProps = {
  path: '/',
  component: undefined,
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
};
