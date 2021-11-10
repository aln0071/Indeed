/* eslint-disable import/no-cycle */
import React from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import '../styles.css';

function FindSalaries() {
  return (
    <>
      <JobSeekerNavbar />
      <h1 className="children">Find Salaries</h1>
    </>
  );
}

export default FindSalaries;
