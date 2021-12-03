/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
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
import ViewCompanyReviews from './components/Employee/ViewCompanyReviews';
import ViewPostedJobs from './components/Employee/ViewPostedJobs';
import Resources from './components/Employee/Resources';

import 'react-toastify/dist/ReactToastify.css';
import CompanyProfileEmployer from './Pages/CompanyProfileEmployer';

import JobseekerMyJobs from './Pages/JobseekerMyJobs';
import MyReviews from './components/JobSeeker/Profile/MyReviews';
import JobSeekerChat from './components/Chat/JobSeekerChat';
import CompanySalaryTab from './components/JobSeeker/CompanySalaryTab';
import WhyJoinUs from './components/JobSeeker/WhyJoinUs';
import ProfileDetails from './components/JobSeeker/Profile/ProfileDetails';
import 'react-toastify/dist/ReactToastify.css';

import CompanyProfileJobSeeker from './Pages/CompanyProfileJobSeeker';
import AddSalary from './components/JobSeeker/AddSalary/AddSalary';
import ProtectedRoute from './components/ProtectedRoutes';
import ConfirmEmployerLogin from './Pages/ConfirmEmployerLogin';
import CompanyProfileEmployerLandingPage from './Pages/CompanyProfileLandingPage';
import AdminHome from './components/AdminPages/AdminPage';
import EmployerAnalysis from './Pages/EmployerAnalysis';

import EmployerChat from './components/Chat/EmployerChat';
import EmployerJobseekerProfile from './components/JobSeeker/Profile/EmployerJobseeker';

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
      {/* <Route exact path="/" component={FindJobs} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/CompanyReviews" component={CompanyReviews} />
      <Route exact path="/FindSalaries" component={FindSalaries} />
      <Route exact path="/company-profile" component={CompanyProfileEmployer} />
      <Route exact path="/cmp/companyid" component={CompanyProfileJobSeeker} />
      <Route exact path="/PostJob" component={PostJob} />
      <Route exact path="/FindCandidates" component={FindCandidates} />
      <Route exact path="/Products" component={Products} />
      <Route exact path="/Resources" component={Resources} /> */}
      <Switch>
        <Route exact path="/" component={FindJobs} />
        <Route exact path="/FindJobs" component={FindJobs} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/CompanyReviews" component={CompanyReviews} />
        <Route exact path="/FindSalaries" component={FindSalaries} />
        <ProtectedRoute
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
        <ProtectedRoute exact path="/myjobs" component={JobseekerMyJobs} />
        <ProtectedRoute exact path="/myreviews" component={MyReviews} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/Resources" component={Resources} />
        <ProtectedRoute path="/jobSeeker/Chat" component={JobSeekerChat} />
        <ProtectedRoute
          path="/employer/ConfirmLogin"
          component={ConfirmEmployerLogin}
        />
        <ProtectedRoute
          exact
          path="/jobSeeker/Profile"
          component={ProfileDetails}
        />
        {/* <ProtectedRoute exact path="/employer/Chat" component={EmployerChat} />
        <ProtectedRoute exact path="/employer/PostJob" component={PostJob} /> */}
        <ProtectedRoute path="/employer/Chat" component={EmployerChat} />
        <ProtectedRoute path="/employer/PostJob" component={PostJob} />

        <Route
          exact
          path="/employee/ViewCompanyReviews"
          component={ViewCompanyReviews}
        />
        <Route
          exact
          path="/employee/ViewPostedJobs"
          component={ViewPostedJobs}
        />
        <Route exact path="/CompanySalaryTab" component={CompanySalaryTab} />
        <Route exact path="/WhyJoinUs" component={WhyJoinUs} />
        <Route exact path="/AddSalary" component={AddSalary} />
        <Route
          exact
          path="/employer/JobseekerProfile"
          component={EmployerJobseekerProfile}
        />

        <Route
          exact
          path="/CompanyProfileEmployerLandingPage"
          component={CompanyProfileEmployerLandingPage}
        />
        <ProtectedRoute exact path="/Analysis" component={EmployerAnalysis} />
        <ProtectedRoute exact path="/AdminHome" component={AdminHome} />
      </Switch>
    </>
  );
}

export default App;
