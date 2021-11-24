const mongoose = require('mongoose');

const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  profilePicId: { type: String },
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  roleInCompany: { type: String },
  companyId: { type: String, required: true },
  jobPreference: {
    jobTitle: { type: String },
    jobType: { type: String },
    contract: { type: String },
    desiredPay: { type: String },
  },
  salary: { type: String },
  currentExperience: { type: Number, required: true },
  resume: { type: String },
  endDate: { type: String },
  benefits: {
    paidTimeOff: { type: Boolean },
    healthInsurance: { type: Boolean },
    lifeInsurance: { type: Boolean },
    dentalVisionInsurance: { type: Boolean },
    retirement: { type: Boolean },
    otherBenefits: { type: Boolean },
    otherBenefitsDesc: { type: Boolean },
  },
  readyToWork: { type: Boolean },
});

const User = mongoose.model('Users', userDetailsSchema);
module.exports = User;
