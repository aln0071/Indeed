/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  chatRoomId: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String },
  time: { type: String },
});

const Message = mongoose.model('Messages', messageSchema);
module.exports = Message;
