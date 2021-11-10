/* eslint-disable import/no-cycle */
import React from 'react';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import '../styles.css';

function FindJobs() {
  return (
    <div>
      <JobSeekerNavbar />
      <h1 className="children">Find Jobs</h1>
    </div>
  );
}

export default FindJobs;
