/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const connection = require('./kafka/Connection');

require('dotenv').config();
const getReviews = require('./services/reviews/GetReviews');
const getUserReviews = require('./services/reviews/GetUserReviews');
const postJob = require('./services/jobs/PostJob');
const getJobsForCompany = require('./services/jobs/GetJobsForCompany');
const getAllJobs = require('./services/jobs/GetAllJobs');
const getJob = require('./services/jobs/GetJob');
const getAllCompany = require('./services/company/GetAllCompany');
const getCompany = require('./services/company/GetCompany');
const postCompany = require('./services/company/PostCompany');
const updateCompany = require('./services/company/UpdateCompany');
const getJobLocations = require('./services/jobs/GetJobLocations');
const getJobSeekerProfile = require('./services/profile/GetJobSeekerProfile');
const addJobSeekerInfosalary = require('./services/profile/AddJobSeekerInfosalary');
const applyJob = require('./services/jobs/ApplyJob');
const createMessage = require('./services/messaging/CreateMessage');
const createRoom = require('./services/messaging/CreateRoom');
const getMessages = require('./services/messaging/GetMessages');
const getRooms = require('./services/messaging/GetRooms');
const postReviews = require('./services/reviews/PostReview');
const postHelpfulReviews = require('./services/reviews/PostReviewHelpfulness');
const getAppliedJob = require('./services/jobs/GetAppliedJob');
const getCompanyDetails = require('./services/company/GetCompanyDetails');
const getCompanyByEmployer = require('./services/company/GetCompanyByEmployer');
const getUserProfile = require('./services/profile/GetUserProfile');
const getFeaturedAndUserReviews = require('./services/reviews/GetFeaturedAndUserReviews');
const postFeaturedReviews = require('./services/reviews/PostFeaturedReviews');
const postSaveJob = require('./services/jobs/PostSaveJob');
const postUndoSaveJob = require('./services/jobs/PostUndoSaveJob');
const addPictures = require('./services/pictures/AddPictures');
const userProfileUpdate = require('./services/profile/UserProfileUpdate');
const getSalaries = require('./services/salaries/GetSalaries');
const userDeleteResume = require('./services/profile/UserDeleteResume');
const savedJobs = require('./services/jobs/GetSavedJobs');
const { mongoDB } = require('../Config');
const getAllReviews = require('./services/reviews/GetAllReviews');
const getAllPhotos = require('./services/reviews/GetAllPhotos');
const AdminReviewAction = require('./services/reviews/AdminReviewAction');
const IndeedAnalytics = require('./services/reviews/IndeedAnalytics');
const AdminReviewPhotosAction = require('./services/reviews/AdminReviewPhotosAction');
const IndeedEmployerJobAnalysis = require('./services/jobs/IndeedEmployerJobAnalysis');
const updateApplicantStatus = require('./services/jobs/UpdateApplicantStatus');

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
handleTopicRequest('indeed_get_user_reviews', getUserReviews);
handleTopicRequest('indeed_get_all_company', getAllCompany);
handleTopicRequest('indeed_get_company', getCompany);

handleTopicRequest('indeed_post_job', postJob);
handleTopicRequest('indeed_get_jobs', getJobsForCompany);
handleTopicRequest('indeed_get_all_jobs', getAllJobs);
handleTopicRequest('indeed_get_job', getJob);
handleTopicRequest('indeed_get_all_job_locations', getJobLocations);

handleTopicRequest('indeed_post_company', postCompany);
handleTopicRequest('indeed_put_company', updateCompany);

handleTopicRequest('indeed_get_jobseeker_profile', getJobSeekerProfile);
handleTopicRequest('indeed_add_jobseekerInfo_salary', addJobSeekerInfosalary);

handleTopicRequest('indeed_apply_job', applyJob);

handleTopicRequest('indeed_create_message', createMessage);
handleTopicRequest('indeed_get_messages', getMessages);
handleTopicRequest('indeed_create_room', createRoom);
handleTopicRequest('indeed_get_rooms', getRooms);

handleTopicRequest('indeed_get_all_reviews', getAllReviews);
handleTopicRequest('indeed_admin_review_action', AdminReviewAction);
handleTopicRequest('indeed_analytics', IndeedAnalytics);
handleTopicRequest('indeed_employer_job_analysis', IndeedEmployerJobAnalysis);
handleTopicRequest('indeed_post_reviews', postReviews);
handleTopicRequest('indeed_post_helpful_reviews', postHelpfulReviews);
handleTopicRequest('indeed_getapplied_job', getAppliedJob);

handleTopicRequest('indeed_get_companyDetails', getCompanyDetails);
handleTopicRequest('indeed_get_user_profile', getUserProfile);
handleTopicRequest('indeed_add_pictures', addPictures);

handleTopicRequest(
  'indeed_get_companyDetails_by_employerId',
  getCompanyByEmployer,
);

handleTopicRequest(
  'indeed_get_featured_user_reviews',
  getFeaturedAndUserReviews,
);
handleTopicRequest('indeed_post_featured_reviews', postFeaturedReviews);
handleTopicRequest('indeed_post_save_job', postSaveJob);
handleTopicRequest('indeed_post_undosave_job', postUndoSaveJob);
handleTopicRequest('indeed_userprofile_update', userProfileUpdate);
handleTopicRequest('indeed_userProfile_deleteResume', userDeleteResume);
handleTopicRequest('indeed_get_photos_admin', getAllPhotos);
handleTopicRequest('indeed_review_photos_admin', AdminReviewPhotosAction);

handleTopicRequest('indeed_get_salaries', getSalaries);
handleTopicRequest('indeed_get_saved_jobs', savedJobs);
handleTopicRequest('indeed_update_applicant_status', updateApplicantStatus);
