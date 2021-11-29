/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

function CustomRating(props) {
  return (
    <Stack spacing={2}>
      <Rating
        name="simple-controlled"
        value={props.value}
        precision={0.5}
        onChange={(event, newValue) => {
          props.handleChangeRating(newValue);
        }}
        readOnly={props.readOnly}
      />
    </Stack>
  );
}
CustomRating.propTypes = {
  // ...prop type definitions here
  value: PropTypes.number,
  readOnly: PropTypes.bool,
  handleChangeRating: PropTypes.func,
};
export default CustomRating;
