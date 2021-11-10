/* eslint-disable import/no-cycle */
import React from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import '../styles.css';

function CompanyReviews() {
  return (
    <>
      <JobSeekerNavbar />
      <h1 className="children">Company reviews</h1>
    </>
  );
}

export default CompanyReviews;
