export const baseUrl = 'http://localhost:3003/';
export const urls = {
  register: 'indeed/user/UserRegistration',
  login: 'indeed/user/UserLogin',
  updateCompanyProfile: 'indeed/api/company',
  getCompaniesWithNameOrLocation: 'indeed/api/companiesList',
  getAllJobs: 'indeed/api/jobs',
  getSpecificJob: 'indeed/api/company',
  getSearchedJobs: 'indeed/api/jobs',
  // postReview: 'indeed/api/jobseeker',
  getReviews: 'indeed/api/jobseeker',
  saveJob: '',
  unsaveJob: '',
  reviewHelpful: 'indeed/api/reviews',
  reviewUnhelpful: 'indeed/api/reviews',
  getMyJobs: 'indeed/api/jobseeker/getAppliedJob',
  postReview: 'indeed/api/jobseeker',
  uploadCompanyPhotos: 'indeed/api/uploadCompanyPhotos',
  imageUpload: 'indeed/files/upload/images',
  getCompanyDetailsByEmployerId:
    'indeed/api/companyDetails/forEmployer/{employerid}',
};
