/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Steps, Step } from 'react-step-builder';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Row, Column } from 'react-foundation';
import styles from '../../../styles.scss';
import JobSeekerNavbar from '../../Navbars/JobSeekerNavbar';
import AddSalary from './AddSalary';
import AddSalary1 from './AddSalary1';

const theme = createTheme();

const Navigation = (props) => {
  console.log({ props });
  return (
    <Row align="center">
      <Column>
        <Button type="primary" onClick={props.prev} style={{ marginRight: 10 }}>
          Previous
        </Button>
      </Column>
      <Column>
        <Button type="primary" onClick={props.next}>
          Next
        </Button>
      </Column>
    </Row>
  );
};

function AddSalaryParent({ CompanyName }) {
  const config = {
    navigation: {
      component: Navigation, // a React component with special props provided automatically
      location: 'after', // or before
    },
  };

  console.log(CompanyName);

  return (
    <>
      <Steps config={config}>
        <Step component={AddSalary} />
        <Step component={AddSalary1} />
      </Steps>
    </>
  );
}

export default AddSalaryParent;
