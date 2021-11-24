const mongoose = require('mongoose');

const { Schema } = mongoose;

const inboxSchema = new Schema({
  employerId: { type: String, required: true },
  jobSeekerId: { type: String, required: true },
  jobSeekerName: { type: String },
});

const inbox = mongoose.model('Inbox', inboxSchema);
module.exports = inbox;
