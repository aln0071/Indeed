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
// eslint-disable-next-line import/named
import EmployerNavbar from '../Navbars/EmployerNavbar';

function EmployerChat() {
  const chatRooms = useSelector((state) => state.message.rooms);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const handleClick = (e, item) => {
    dispatch(setSender(item.employer));
    dispatch(setReceiver(item.jobSeeker));
    dispatch(getRoomConversations(item));
  };
  useEffect(() => {
    dispatch(getRooms(userId, 'employer'));
  }, []);

  useEffect(async () => {
    if (chatRooms.length) {
      dispatch(setSender(chatRooms[0].employer));
      dispatch(setReceiver(chatRooms[0].jobSeeker));
      dispatch(getRoomConversations(chatRooms[0]));
    }
  }, [chatRooms]);

  return (
    <>
      <EmployerNavbar />
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

export default EmployerChat;
