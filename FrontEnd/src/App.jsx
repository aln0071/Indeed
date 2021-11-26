import React from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Register from './Pages/Register';
// import LandingPage from './components';
import FindJobs from './components/JobSeeker/FindJobs';
import FindSalaries from './components/JobSeeker/FindSalaries';
import CompanyReviews from './components/JobSeeker/CompanyReviews';
// import EmployeeLandingPage from './components/Employee/EmployeeLandingPage';
import PostJob from './components/Employee/PostJob';
import FindCandidates from './components/Employee/FindCandidates';
import Products from './components/Employee/Products';
import Resources from './components/Employee/Resources';
import 'react-toastify/dist/ReactToastify.css';
import CompanyProfile from './Pages/CompanyProfile';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <Route exact path="/" component={FindJobs} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      {/* <Route exact path="/FindJobs" component={FindJobs} /> */}
      <Route exact path="/CompanyReviews" component={CompanyReviews} />
      <Route exact path="/FindSalaries" component={FindSalaries} />
      <Route exact path="/company-profile" component={CompanyProfile} />
      {/* <Route
        exact
        path="/EmployeeLandingPage"
        component={EmployeeLandingPage}
      /> */}
      <Route exact path="/PostJob" component={PostJob} />
      <Route exact path="/FindCandidates" component={FindCandidates} />
      <Route exact path="/Products" component={Products} />
      <Route exact path="/Resources" component={Resources} />
    </>
  );
}

export default App;
