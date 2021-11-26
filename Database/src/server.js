/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const connection = require('./kafka/Connection');

require('dotenv').config();
const getReviews = require('./services/reviews/GetReviews');
const postJob = require('./services/jobs/PostJob');
const getJobsForCompany = require('./services/jobs/GetJobsForCompany');
const getAllJobs = require('./services/jobs/GetAllJobs');
const getJob = require('./services/jobs/GetJob');
const getAllCompany = require('./services/company/GetAllCompany');
const postCompany = require('./services/company/PostCompany');
const getJobLocations = require('./services/jobs/GetJobLocations');
const getJobSeekerProfile = require('./services/Profile/GetJobSeekerProfile');
const addJobSeekerInfosalary = require('./services/Profile/AddJobSeekerInfosalary');
const applyJob = require('./services/jobs/ApplyJob');
const { mongoDB } = require('../Config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

mongoose.connect(mongoDB, options, (err) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

function handleTopicRequest(topicName, fname) {
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            error: err,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  });
}

handleTopicRequest('indeed_get_reviews', getReviews);
handleTopicRequest('indeed_get_all_company', getAllCompany);

handleTopicRequest('indeed_post_job', postJob);
handleTopicRequest('indeed_get_jobs', getJobsForCompany);
handleTopicRequest('indeed_get_all_jobs', getAllJobs);
handleTopicRequest('indeed_get_job', getJob);
handleTopicRequest('indeed_get_all_job_locations', getJobLocations);

handleTopicRequest('indeed_post_company', postCompany);

handleTopicRequest('indeed_get_jobseeker_profile', getJobSeekerProfile);
handleTopicRequest('indeed_add_jobseekerInfo_salary', addJobSeekerInfosalary);

handleTopicRequest('indeed_apply_job', applyJob);
