/* eslint-disable linebreak-style */
const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  const { userId, jobId, internalStatus } = req.body;
  const jobDetails = await Jobs.findOne({ jobId });

  const { applicantDetails } = jobDetails;

  const applicantInfo = applicantDetails.find((x) => x.jobSeekerId === userId);
  if (!applicantInfo) {
    callback(null, { Msg: 'Job application with given applicant not found' });
    return;
  }
  applicantInfo.internalStatus = internalStatus;
  const updatedJob = await jobDetails.save();
  callback(null, updatedJob);
}

exports.handle_request = handleRequest;
