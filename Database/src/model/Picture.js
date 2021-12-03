const mongoose = require('mongoose');

const { Schema } = mongoose;

const picturesSchema = new Schema({
  pictureKey: { type: String, required: true },
  userId: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  caption: { type: String },
  location: { type: String },
  context: { type: String },
});

const Pictures = mongoose.model('Pictures', picturesSchema);
module.exports = Pictures;
