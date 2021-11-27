/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import '../styles.css';

const useStyles = makeStyles(() => ({
  body: {
    margin: '10px',
  },
}));

function SearchField({
  value,
  onChange,
  required,
  plceholder,
  endIcon,
  startIcon,
  endPosition = 'right',
  startPosition = 'left',
}) {
  const classes = useStyles();
  return (
    <Grid item>
      <TextField
        className={classes.body}
        required={required}
        type="text"
        variant="outlined"
        placeholder={plceholder}
        value={value}
        onChange={onChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        InputProps={{
          endAdornment: (
            <InputAdornment position={endPosition}>{endIcon}</InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position={startPosition}>
              {startIcon}
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  plceholder: PropTypes.string.isRequired,
  endIcon: PropTypes.node.isRequired,
  startIcon: PropTypes.node.isRequired,
  endPosition: PropTypes.string.isRequired,
  startPosition: PropTypes.string.isRequired,
};

export default SearchField;
