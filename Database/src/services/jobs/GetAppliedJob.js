/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const Jobs = require('../../model/Job');
const Company = require('../../model/Company');
const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    const { companyId, jobId } = req.params;
    const userId = req.params.jobseekerId;

    // const try1 = await Jobs.find( {}, { applicantDetails: { $elemMatch: { jobSeekerId:  userId } }} )

    const try1 = await Jobs.find({
      applicantDetails: { $elemMatch: { jobSeekerId: userId } },
    });

    const jobs1 = await Jobs.find({
      'applicantDetails.jobSeekerId': userId,
    }).select({
      'applicantDetails.$': 1,
      jobTitle: 1,
      jobSalary: 1,
      jobDescription: 1,
      jobType: 1,
    });

    console.log(jobs1);
    callback(null, jobs1);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
