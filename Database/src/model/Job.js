/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  jobId: { type: mongoose.Types.ObjectId, auto: true },
  companyId: { type: String, required: true },
  jobTitle: { type: String },
  jobSalary: { type: Number },
  jobSalaryUnit: { type: String },
  jobDescription: { type: String },
  jobFullDescription: { type: String },
  qualification: { type: String },
  jobType: { type: String },
  workType: { type: String },
  industry: { type: String },
  benefits: [String],
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  applicantDetails: [
    {
      jobSeekerId: { type: String, required: true },
      jobSeekerName: { type: String },
      status: { type: String },
      internalStatus: { type: String },
      resumeLink: { type: String },
      appliedDate: { type: String },
      currentlyWorking: { type: String },
      lastWorkingDate: { type: String },
      experience: { type: Number },
      currentCompany: { type: String },
      currentJobTitle: { type: String },
      currentSalary: { type: Number },
    },
  ],
});

jobSchema.set('toObject', { virtuals: true });
jobSchema.set('toJSON', { virtuals: true });

jobSchema.virtual('company', {
  ref: 'company',
  localField: 'companyId',
  foreignField: 'companyId',
  justOne: true, // for many-to-1 relationships
});

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;
