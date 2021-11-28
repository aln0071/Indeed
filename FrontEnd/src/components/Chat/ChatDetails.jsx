/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import ChatDetailsHeader from './ChatDetailsHeader';
import ChatConversation from './ChatConversation';
import ChatDetailsFooter from './ChatDetailsFooter';

function ChatDetails() {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <ChatDetailsHeader />
      <Box p={3} height="100%" style={{ overflowY: 'auto' }}>
        <ChatConversation />
      </Box>
      <ChatDetailsFooter />
    </Box>
  );
}

export default ChatDetails;
