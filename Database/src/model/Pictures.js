const mongoose = require('mongoose');

const { Schema } = mongoose;

const picturesSchema = new Schema({
  pictureId: { type: String, required: true },
  picturePath: { type: String, required: true },
  userId: { type: String, required: true },
  isApproved: { type: String },
  context: { type: String },
});

const Pictures = mongoose.model('useDetails', picturesSchema);
module.exports = Pictures;
