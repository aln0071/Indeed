/* eslint-disable linebreak-style */
import {
  SET_CHAT_ROOMS,
  SET_CURRENT_CONVERSATION,
  SET_CURRENT_ROOM,
  UPDATE_CONVERSATION,
  SET_SENDER,
  SET_RECEIVER,
  CREATE_ROOM,
  OPEN_MESSAGE_BOX,
} from '../actions/types';

const initialState = {
  rooms: [],
  conversation: [],
  currentRoom: {},
  sender: {},
  lastCreatedRoom: {},
  openChat: false,
};

const message = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_CHAT_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case UPDATE_CONVERSATION:
      return {
        ...state,
        conversation: [...state.conversation, action.payload],
      };
    case SET_SENDER:
      return {
        ...state,
        sender: action.payload,
      };
    case SET_RECEIVER:
      return {
        ...state,
        receiver: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        lastCreatedRoom: action.payload,
      };
    case OPEN_MESSAGE_BOX:
      return {
        ...state,
        openChat: action.payload,
      };
    default:
      return state;
  }
};

export default message;
