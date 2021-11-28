import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TagFaces from '@material-ui/icons/TagFaces';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../../store/actions/message';

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

const ChatBar = () => {
  const styles = useStyles();
  const room = useSelector((state) => state.message.currentRoom);
  const sender = useSelector((state) => state.message.sender);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onMessageSend = () => {
    const payload = {
      chatRoomId: room.chatRoomId,
      senderId: sender.userId,
      message,
      time: Date.now(),
    };
    setMessage('');
    dispatch(postMessage(payload));
  };
  return (
    <Box display="flex" minHeight={70} alignItems="center" px={2}>
      <IconButton edge="start" color="inherit">
        <AttachFileIcon className={styles.icon} />
      </IconButton>

      <InputBase
        fullWidth
        className={styles.input}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message..."
        startAdornment={(
          <InputAdornment position="start">
            <IconButton edge="start" color="inherit">
              <TagFaces />
            </IconButton>
          </InputAdornment>
        )}
      />

      <IconButton edge="end" onClick={() => onMessageSend()} color="inherit">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBar;
