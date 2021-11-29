/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ColorButton2 } from '../../customComponents/index';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import CustomPagination from '../../customComponents/Pagination';

import '../../styles.css';

const useStyles = makeStyles(() => ({
  searchContainer: {
    margin: '40px 0',
  },
  icon: {
    position: 'relative',
    left: '3px',
    height: '20px',
    color: '#2D2D2D',
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
}));

function Reviews() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [helpful, setHelpful] = useState(false);
  const [rating, setRating] = useState(false);
  const [date, setDate] = useState(false);
  const [all, setAll] = useState(true);
  const [asc, setAsc] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleHelpful = () => {
    setHelpful(true);
    setRating(false);
    setDate(false);
    setAll(false);
  };
  const handleRating = () => {
    setHelpful(false);
    setRating(true);
    setDate(false);
    setAll(false);
  };
  const handleDate = () => {
    setHelpful(false);
    setRating(false);
    setDate(true);
    setAll(false);
  };
  const handleAll = () => {
    setHelpful(false);
    setRating(false);
    setDate(false);
    setAll(true);
  };
  const handleAsc = () => {
    setAsc(!asc);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <div className={classes.wrapper}>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          style={{ marginBottom: '20px' }}
        >
          <Button
            className={classes.root}
            style={{
              background: all ? '#595959' : 'initial',
              color: all ? 'white' : 'initial',
            }}
            onClick={handleAll}
          >
            All
          </Button>
          <Button
            className={classes.root}
            style={{
              background: helpful ? '#595959' : 'initial',
              color: helpful ? 'white' : 'initial',
            }}
            onClick={handleHelpful}
          >
            Helpful
          </Button>
          <Button
            className={classes.root}
            style={{
              background: rating ? '#595959' : 'initial',
              color: rating ? 'white' : 'initial',
            }}
            onClick={handleRating}
          >
            Rating
          </Button>
          <Button
            className={classes.root}
            style={{
              background: date ? '#595959' : 'initial',
              color: date ? 'white' : 'initial',
            }}
            onClick={handleDate}
          >
            Date
          </Button>
          <Button className={classes.root} onClick={handleAsc}>
            {asc ? (
              <ArrowUpwardIcon className={classes.icon} />
            ) : (
              <ArrowDownwardIcon className={classes.icon} />
            )}
          </Button>
        </ButtonGroup>
        <ColorButton2
          variant="contained"
          style={{ margin: '20px 0 20px 0' }}
          onClick={() => {
            if (Object.keys(user).length === 0) {
              history.push('/Login');
            } else {
              setOpen(true);
            }
          }}
        >
          {' '}
          Write Review
        </ColorButton2>
      </div>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewModal open={open} handleClose={handleClose} />
      <CustomPagination
        count={10}
        page={1}
        // handleChangePage={handleChangePage}
      />
    </Box>
  );
}

export default Reviews;
