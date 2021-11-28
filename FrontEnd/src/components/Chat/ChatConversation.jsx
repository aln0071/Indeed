/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';
import Chat from './Chat';

const ChatConversation = () => {
  const chatMessages = useSelector((state) => state.message.conversation);
  const user = useSelector((state) => state.message.sender);

  const getSide = (message) => {
    if (user.userId === message.senderId) {
      return 'right';
    }
    return 'left';
  };

  return (
    <Box p="16px 30px 12px 10px">
      <List>
        {chatMessages.map((message) => (
          <Chat
            side={getSide(message)}
            avatar={user.ImageUrl}
            messages={[message.message]}
          />
        ))}
      </List>
    </Box>
  );
};

export default ChatConversation;
