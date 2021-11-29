/* eslint-disable linebreak-style */
/* eslint-disable import/no-duplicates */
/* eslint-disable linebreak-style */
import React from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
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
import EmployerChat from './components/Chat/EmployerChat';
import 'react-toastify/dist/ReactToastify.css';
import CompanyProfileEmployer from './Pages/CompanyProfileEmployer';

import JobseekerMyJobs from './Pages/JobseekerMyJobs';
import JobSeekerChat from './components/Chat/JobSeekerChat';
import CompanySalaryTab from './components/JobSeeker/CompanySalaryTab';
import WhyJoinUs from './components/JobSeeker/WhyJoinUs';
import 'react-toastify/dist/ReactToastify.css';

import CompanyProfileJobSeeker from './Pages/CompanyProfileJobSeeker';
import AddSalary from './components/JobSeeker/AddSalary/AddSalary';
import AddSalary1 from './components/JobSeeker/AddSalary/AddSalary1';
import AddSalaryParent from './components/JobSeeker/AddSalary/AddSalaryParent';
import ProtectedRoute from './components/ProtectedRoutes';

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
      <Switch>
        <Route exact path="/" component={FindJobs} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/CompanyReviews" component={CompanyReviews} />
        <Route exact path="/FindSalaries" component={FindSalaries} />
        <Route
          exact
          path="/company-profile"
          component={CompanyProfileEmployer}
        />
        <Route
          exact
          path="/cmp/companyid"
          component={CompanyProfileJobSeeker}
        />
        {/* <Route exact path="/PostJob" component={PostJob} /> */}
        <Route exact path="/FindCandidates" component={FindCandidates} />
        <Route exact path="/myjobs" component={JobseekerMyJobs} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/Resources" component={Resources} />
        <ProtectedRoute
          exact
          path="/jobSeeker/Chat"
          component={JobSeekerChat}
        />
        <ProtectedRoute exact path="/employer/Chat" component={EmployerChat} />
        <ProtectedRoute exact path="/employer/PostJob" component={PostJob} />
        <Route exact path="/CompanySalaryTab" component={CompanySalaryTab} />
        <Route exact path="/WhyJoinUs" component={WhyJoinUs} />
        <Route exact path="/AddSalary" component={AddSalary} />
        <Route exact path="/AddSalary1" component={AddSalary1} />
        <Route exact path="/AddSalaryParent" component={AddSalaryParent} />
      </Switch>
    </>
  );
}

export default App;
