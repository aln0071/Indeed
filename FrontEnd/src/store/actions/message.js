import { toast } from 'react-toastify';
import {
  SET_CHAT_ROOMS,
  SET_CURRENT_CONVERSATION,
  SET_CURRENT_ROOM,
  SET_SENDER,
  SET_RECEIVER,
  UPDATE_CONVERSATION,
  CREATE_ROOM,
  OPEN_MESSAGE_BOX,
} from './types';
import { createToastBody, toastOptions } from '../../utils';
import {
  getChatRooms,
  getConversations,
  postConversation,
  postInitialConversation,
} from '../../utils/endpoints';

const setChatRooms = (rooms) => ({
  type: SET_CHAT_ROOMS,
  payload: rooms,
});

const setConversations = (chats) => ({
  type: SET_CURRENT_CONVERSATION,
  payload: chats,
});

const setCurrentRoom = (room) => ({
  type: SET_CURRENT_ROOM,
  payload: room,
});

const updateConversation = (message) => ({
  type: UPDATE_CONVERSATION,
  payload: message,
});

const setSenderDetails = (sender) => ({
  type: SET_SENDER,
  payload: sender,
});

const setReceiverDetails = (sender) => ({
  type: SET_RECEIVER,
  payload: sender,
});

const setLastCreatedRoom = (room) => ({
  type: CREATE_ROOM,
  payload: room,
});

const setOpenChat = (open) => ({
  type: OPEN_MESSAGE_BOX,
  payload: open,
});

export const getRooms = (userId, type) => async (dispatch) => {
  try {
    const response = await getChatRooms(userId, type);
    dispatch(setChatRooms(response));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const getRoomConversations = (room) => async (dispatch) => {
  try {
    const response = await getConversations(room.chatRoomId);
    dispatch(setCurrentRoom(room));
    dispatch(setConversations(response));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const postMessage = (message) => async (dispatch) => {
  try {
    const response = await postConversation(message);
    dispatch(updateConversation(response));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const setSender = (sender) => async (dispatch) => {
  try {
    dispatch(setSenderDetails(sender));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const setReceiver = (receiver) => async (dispatch) => {
  try {
    dispatch(setReceiverDetails(receiver));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const postChatRoom = (room, message) => async (dispatch) => {
  try {
    const response = postInitialConversation(room, message);
    dispatch(setLastCreatedRoom(response));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export const setOpenChatBox = (open) => async (dispatch) => {
  try {
    dispatch(setOpenChat(open));
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};
