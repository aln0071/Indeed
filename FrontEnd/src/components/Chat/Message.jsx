/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/named
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { postChatRoom, setOpenChatBox } from '../../store/actions/message';

function Message(props) {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const openChat = useSelector((state) => state.message.openChat);
  const employerId = useSelector((state) => state.user.userId);
  const jobSeekerId = sessionStorage.getItem('selectedUser');
  const clearInput = () => {
    setSubject('');
    setBody('');
  };
  const onMessage = () => {
    const chatRoom = { employerId, jobSeekerId };
    const message = {
      senderId: employerId,
      message: `${subject}\n${body}`,
      time: Date.now(),
    };
    dispatch(postChatRoom(chatRoom, message));
    dispatch(setOpenChatBox(false));
    clearInput();
  };
  const onDiscard = () => {
    dispatch(setOpenChatBox(false));
    clearInput();
  };

  return (
    <>
      <Dialog fullWidth open={openChat} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Message</DialogTitle>
        <DialogContent>
          <Typography>Subject</Typography>
          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            id="subject"
            name="subject"
            value={subject}
            autoComplete="subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <Typography>Body</Typography>
          <TextField
            margin="dense"
            multiline
            minRows={10}
            variant="outlined"
            required
            fullWidth
            id="body"
            name="body"
            value={body}
            autoComplete="subject"
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onDiscard()}
            variant="contained"
            color="primary"
          >
            Discard
          </Button>
          <Button
            onClick={() => onMessage()}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Message;
