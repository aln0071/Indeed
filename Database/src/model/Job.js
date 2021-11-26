const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  jobId: { type: String, required: true },
  companyId: { type: String, required: true },
  jobTitle: { type: String },
  jobSalary: { type: Number },
  jobDescription: { type: String },
  jobFullDescription: { type: String },
  qualification: { type: String },
  jobType: { type: String },
  workType: { type: String },
  industry: { type: String },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  applicantDetails: [{
    jobSeekerId: { type: String, required: true },
    status: { type: String },
    resumeLink: { type: String },
    appliedDate: { type: String },
    currentlyWorking: { type: String },
    lastWorkingDate: { type: String },
    experience: { type: Number },
    currentJobTitle: { type: String },
    currentSalary: { type: Number },
  }],
});

const Jobs = mongoose.model('useDetails', jobSchema);
module.exports = Jobs;
