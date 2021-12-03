/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const companyInfoSchema = new Schema({
  companyId: { type: mongoose.Types.ObjectId, auto: true },
  companyName: { type: String, required: true },
  employerId: { type: String, required: true },
  aboutUs: { type: String, required: true },
  workCulture: { type: String },
  companyValues: { type: String },
  companyMission: { type: String },
  companyVision: { type: String },
  avgRating: { type: Number },
  avgAnnualSalary: { type: Number },
  totalReviews: { type: Number },
  totalSalaryReported: { type: Number },
  pictures: [{ type: mongoose.Types.ObjectId, ref: 'Pictures' }],
  logo: { type: mongoose.Types.ObjectId, ref: 'Pictures' },
  hiredApplicants: { type: Number },
  rejectedApplicants: { type: Number },
  totalApplicants: { type: Number },
  website: { type: String },
  founded: { type: String },
  industry: { type: String },
  ceoName: { type: String },
  companySize: { type: String },
  companyType: { type: String },
  revenue: { type: String },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
});

const companyInfo = mongoose.model('company', companyInfoSchema);
module.exports = companyInfo;
