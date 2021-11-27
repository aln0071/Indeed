import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import { Button, withStyles } from '@material-ui/core';

const CustomButton = withStyles(() => ({
  root: {
    color: '#ffffff',
    backgroundColor: '#085ff7',
    cursor: 'pointer',
    width: '200px',
    borderRadius: '200px',
    height: '53px',
    marginLeft: '30px',
    '&:hover': {
      backgroundColor: '#0542ac',
    },
  },
}))(Button);

function FindButton({ label }) {
  return (
    <>
      <CustomButton variant="contained">{label}</CustomButton>
    </>
  );
}

FindButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FindButton;
