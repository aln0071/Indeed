/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
/* eslint react/jsx-props-no-spreading: 0 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Jobs from './Jobs';
import { Snapshot } from './SnapshotTab';
import Review from './Reviews';
import PhotosTab from './PhotosTab/PhotosTab';

import WhyJoinUs from '../WhyJoinUs';
import CompanySalaryTab from '../CompanySalaryTab';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: <div />,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#232f3e',
    height: '4px',
  },
  '& .MuiTab-root': {
    padding: '0px',
    minWidth: '0px',
    margin: '0px 20px',
  },
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  '&.Mui-selected': {
    color: '#232f3e',
  },
});

export default function BasicTabs() {
  const [value, setValue] = React.useState(4);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <StyledTab label="Snapshot" {...a11yProps(0)} />
          <StyledTab label="Why Join Us" {...a11yProps(1)} />
          <StyledTab label="Reviews" {...a11yProps(2)} />
          <StyledTab label="Salaries" {...a11yProps(3)} />
          <StyledTab label="Photos" {...a11yProps(4)} />
          <StyledTab label="Jobs" {...a11yProps(5)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Snapshot />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WhyJoinUs />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Review handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompanySalaryTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PhotosTab />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Jobs />
      </TabPanel>
    </Box>
  );
}
