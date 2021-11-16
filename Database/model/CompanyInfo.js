const mongoose = require('mongoose');

const { Schema } = mongoose;

const companyInfoSchema = new Schema({
  companyId: { type: String, required: true },
  aboutUs: { type: String, required: true },
  workCulture: { type: String },
  companyValues: { type: String },
  companyMission: { type: String },
  companyVision: { type: String },
  avgRating: { type: Number },
  avgAnnualSalary: { type: Number },
  totalReviews: { type: Number },
  totalSalaryReported: { type: Number },
  pictures: [String],
  hiredApplicants: { type: Number },
  rejectedApplicants: { type: Number },
  totalApplicants: { type: Number },
});

const companyInfo = mongoose.model('useDetails', companyInfoSchema);
module.exports = companyInfo;
