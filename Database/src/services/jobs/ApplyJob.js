/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Jobs = require('../../model/Job');
const Users = require('../../model/User');

async function handleRequest(req, callback) {
  const userId = req.params.jobseekerId;
  // const companyId = req.params.companyId;
  const jobId = mongoose.Types.ObjectId(req.params.jobId);

  const userPayload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    address: req.body.address,
  };

  const jobPayload = {
    jobSeekerId: userId,
    status: 'Application Received',
    resumeLink: req.body.resumeLink,
    // coverLetter: req.body.coverLetter,
    jobSeekerName: `${req.body.firstName} ${req.body.lastName}`,
    currentCompany: req.body.company,
    currentJobTitle: req.body.currentJobTitle,
  };

  // const userDetails = await Users.findOne({ userId: userId });
  const JobDetails = await Jobs.findOne({ jobId });

  const checkIfApplied = await Jobs.findOne({
    $and: [
      {
        'applicantDetails.jobSeekerId': { $eq: userId },
        jobId: { $eq: jobId },
      },
    ],
  });
  //     {'applicantDetails.jobSeekerId': userId
  //   })]

  console.log('checking', checkIfApplied);
  if (checkIfApplied) {
    callback(null, { Msg: 'You have already applied to this Job' }); // { Msg: 'You have already applied to this Job' }
  } else if (JobDetails) {
    Users.findOneAndUpdate(
      { userId: req.params.jobseekerId },
      userPayload,
      { new: true },
      (err, updatedUser) => {
        if (err) callback(null, err);
        callback(null, updatedUser);
      },
    );
    Jobs.findOneAndUpdate(
      { jobId },
      { $push: { applicantDetails: jobPayload } },
      (err, updatedJob) => {
        if (err) callback(null, err);
        callback(null, updatedJob);
      },
    );
  } else {
    console.log('user not found');
    callback(null, { msg: 'User Not Found' });
  }
}

exports.handle_request = handleRequest;
