import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import fetchIntercept from 'fetch-intercept';
import App from './App';
import store from './store';
import './index.css';

/* eslint no-param-reassign: 0 */
fetchIntercept.register({
  request(url, config) {
    if (url.includes('hcaptcha')) {
      url = `https://cors-pxy.herokuapp.com/${url}`;
      return [url, config];
    }
    // Modify the url or config here
    const { user } = store.getState();
    const { token } = user;
    const auth = {
      Authorization: token,
    };
    if (config) {
      if (config.headers) {
        config.headers = {
          ...config.headers,
          ...auth,
        };
      } else {
        config.headers = auth;
      }
    } else {
      return [url, { headers: { ...auth } }];
    }
    return [url, config];
  },

  requestError(error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response(response) {
    // Modify the reponse object
    return response;
  },

  responseError(error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
