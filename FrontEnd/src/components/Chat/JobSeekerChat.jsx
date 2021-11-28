/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import ChatList from './ChatList';
import ChatListHeader from './ChatListHeader';
import ChatDetails from './ChatDetails';
import {
  getRooms,
  getRoomConversations,
  setSender,
  setReceiver,
} from '../../store/actions/message';
import JobSeekerNavbar from '../Navbars/JobSeekerNavbar';

function JobSeekerChat() {
  const chatRooms = useSelector((state) => state.message.rooms);
  const dispatch = useDispatch();
  const handleClick = (e, item) => {
    dispatch(setSender(item.jobSeeker));
    dispatch(setReceiver(item.employer));
    dispatch(getRoomConversations(item));
  };
  useEffect(() => {
    dispatch(getRooms('125', 'jobSeeker'));
  }, []);

  useEffect(async () => {
    if (chatRooms.length) {
      dispatch(setSender(chatRooms[0].jobSeeker));
      dispatch(setReceiver(chatRooms[0].employer));
      dispatch(getRoomConversations(chatRooms[0]));
    }
  }, [chatRooms]);

  return (
    <>
      <JobSeekerNavbar />
      <Box display="flex" flexGrow={1} style={{ overflowY: 'hidden' }}>
        <Box
          width="300px"
          flexShrink={0}
          bgcolor="background.paper"
          style={{ overflowY: 'auto' }}
        >
          <ChatListHeader />
          <ChatList onClick={handleClick} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flexGrow={1}>
          <ChatDetails type="employer" />
        </Box>
      </Box>
    </>
  );
}

export default JobSeekerChat;
