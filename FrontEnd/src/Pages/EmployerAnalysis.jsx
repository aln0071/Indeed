/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployerNavbar from '../components/Navbars/EmployerNavbar';
import StickyHeadTable from '../components/Table';
import { baseUrl } from '../utils/constants';

function EmployerAnalysis() {
  const [columns, setcolumns] = useState([
    { id: 'jobId', label: 'Job Id' },
    { id: 'jobTitle', label: 'Job Title' },
    { id: 'applicantId', label: 'Applicant Id' },
    { id: 'status', label: 'Status' },
  ]);
  const [rows, setrows] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}indeed/api/employer/jobAnalysis/457`).then((res) => {
      setrows(res.data);
    });
  }, []);

  return (
    <>
      <EmployerNavbar />
      <h1 className="children">
        <StickyHeadTable rows={rows} columns={columns} />
      </h1>
    </>
  );
}

export default EmployerAnalysis;
