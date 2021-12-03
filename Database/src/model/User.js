const mongoose = require('mongoose');

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String },
  profilePicId: { type: mongoose.Types.ObjectId, ref: 'Pictures' },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  roleInCompany: { type: String },
  companyId: { type: String },
  companyName: { type: String },
  jobPreference: {
    jobTitle: { type: String },
    jobType: { type: String },
    contract: { type: String },
    desiredPay: { type: String },
  },
  jobLocation: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  salary: { type: Number },
  currentExperience: { type: Number },
  currentlyWorking: { type: Boolean },
  resume: { type: String },
  endDate: { type: String },
  benefits: {
    paidTimeOff: { type: Boolean },
    healthInsurance: { type: Boolean },
    lifeInsurance: { type: Boolean },
    dentalVisionInsurance: { type: Boolean },
    retirement: { type: Boolean },
    otherBenefits: { type: Boolean },
    otherBenefitsDesc: { type: String },
  },
  savedJobs: [mongoose.Types.ObjectId],
  readyToWork: { type: Boolean },
});

const Users = mongoose.model('Users', userDetailsSchema);
module.exports = Users;
