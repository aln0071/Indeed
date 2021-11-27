/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';
import JobCard from '../JobCard';
import '../styles.css';

function FindJobs() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <JobSeekerNavbar />
      <div className="wrapper">
        <div className="subChild1">Hello world</div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Job Feed" value="1" />
              <Tab label="Recent Searches" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: 0 }}>
            <div className="subChild2">
              <div className="left">
                <div className="cardWrapper">
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                  <p>
                    <JobCard />
                  </p>
                </div>
              </div>
              <div className="right">Right Class</div>
            </div>
          </TabPanel>
          <TabPanel value="2">Recent Searches</TabPanel>
        </TabContext>
      </div>
    </Box>
  );
}

export default FindJobs;
