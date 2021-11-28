/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: 'inherit',
  },
  inline: {
    display: 'inline',
  },
}));

const ChatListItem = ({ item, onClick }) => (
  <>
    <ListItem alignItems="flex-start" button onClick={(e) => onClick(e, item)}>
      <ListItemAvatar>
        <Avatar alt={item.firstName} src={item.ImageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={item.jobSeeker.firstName}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
);

export default function ChatList({ onClick }) {
  const classes = useStyles();
  const chatRooms = useSelector((state) => state.message.rooms);

  return (
    <List className={classes.root}>
      {chatRooms.map((item, idx) => (
        <ChatListItem key={idx} item={item} onClick={onClick} />
      ))}
    </List>
  );
}
