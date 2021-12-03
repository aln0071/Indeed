/* eslint-disable linebreak-style */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    const response = await Jobs.find({ companyId: req.params.employerId });
    const finalObj = [];
    response.forEach((job) => {
      job.applicantDetails.map((applicant) => {
        finalObj.push({
          status: applicant.status,
          jobTitle: job.jobTitle,
          applicantId: applicant.jobSeekerId,
          jobId: job._id,
        });
      });
    });
    callback(null, finalObj);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
