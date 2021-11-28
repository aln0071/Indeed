/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import { PropTypes } from 'prop-types';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

function CustomPagination(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.count}
        page={props.page}
        onChange={props.handleChangePage}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
CustomPagination.propTypes = {
  // ...prop type definitions here
  count: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
};
export default CustomPagination;
