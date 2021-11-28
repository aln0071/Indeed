const mongoose = require('mongoose');

const { Schema } = mongoose;

const inboxSchema = new Schema({
  chatRoomId: { type: mongoose.Types.ObjectId, auto: true },
  employerId: { type: String, required: true },
  jobSeekerId: { type: String, required: true },
});

const inbox = mongoose.model('Inbox', inboxSchema);
module.exports = inbox;
