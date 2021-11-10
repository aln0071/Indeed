import React from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components';
import FindJobs from './components/JobSeeker/FindJobs';
import FindSalaries from './components/JobSeeker/FindSalaries';
import CompanyReviews from './components/JobSeeker/CompanyReviews';
import EmployeeLandingPage from './components/Employee/EmployeeLandingPage';
import PostJob from './components/Employee/PostJob';
import FindCandidates from './components/Employee/FindCandidates';
import Products from './components/Employee/Products';

function App() {
  return (
    <>
      <CssBaseline />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/FindJobs" component={FindJobs} />
      <Route exact path="/CompanyReviews" component={CompanyReviews} />
      <Route exact path="/FindSalaries" component={FindSalaries} />
      <Route
        exact
        path="/EmployeeLandingPage"
        component={EmployeeLandingPage}
      />
      <Route exact path="/PostJob" component={PostJob} />
      <Route exact path="/FindCandidates" component={FindCandidates} />
      <Route exact path="/Products" component={Products} />
    </>
  );
}

export default App;
