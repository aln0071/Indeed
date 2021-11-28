import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, InputBase, IconButton, InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(() => ({
  input: {
    flex: 'auto',
    borderRadius: 40,
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
    margin: '0 8px',
    height: 36,
    fontSize: 13,
  },
}));

export default function ChatListHeader() {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      minHeight={70}
      alignItems="center"
      px={2}
      bgcolor="inherit"
    >
      <InputBase
        className={classes.input}
        placeholder="Search"
        startAdornment={(
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )}
      />

      <IconButton edge="end" color="primary">
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
}
