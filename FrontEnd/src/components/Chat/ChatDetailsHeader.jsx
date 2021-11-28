/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    borderRadius: 40,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.message.receiver);

  return (
    <div className={classes.grow}>
      <AppBar position="relative" color="inherit" elevation={1}>
        <Toolbar>
          {user && (
            <Avatar alt={user.firstName} src={user.ImageUrl} edge="start" />
          )}

          <Typography className={classes.title} variant="h6" noWrap>
            {user && user.firstName}
            {' '}
            {user && user.lastName}
          </Typography>
          <IconButton edge="end" color="inherit">
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
