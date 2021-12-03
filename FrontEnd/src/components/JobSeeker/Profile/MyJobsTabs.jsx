/* eslint react/jsx-props-no-spreading: 0 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
// import Jobs from './Jobs';
import { AppliedJobs } from './AppliedJobs';
import { SavedJobs } from './SavedJobs';
// import Review from './Reviews';

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
  const [value, setValue] = React.useState(0);

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
        >
          <StyledTab label="Applied" {...a11yProps(0)} />
          <StyledTab label="Saved" {...a11yProps(1)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AppliedJobs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavedJobs />
      </TabPanel>
    </Box>
  );
}
