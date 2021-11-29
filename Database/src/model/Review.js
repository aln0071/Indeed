const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  reviewId: { type: mongoose.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  rating: { type: Number, required: true },
  happinessIndex: { type: Number },
  learning: { type: String },
  appreciation: { type: Number },
  ceoApproval: { type: Number },
  helpfulnessPositive: { type: Number },
  helpfulnessNegative: { type: Number },
  approved: { type: Boolean },
  isFeatured: { type: Boolean },
  reviewTitle: { type: String },
  reviewDescription: { type: String },
  reviewBy: { type: String },
  reviewerDesignation: { type: String },
  reviewDate: { type: String },
  reviewerCity: { type: String },
  reviewerState: { type: String },
  whatPeopleLiked: { type: String },
  areasOfImprovement: { type: String },
});

const Reviews = mongoose.model('Reviews', reviewSchema);
module.exports = Reviews;
