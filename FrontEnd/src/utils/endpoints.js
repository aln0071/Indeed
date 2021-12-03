import { baseUrl, urls } from './constants';
import { post, get, postResume } from './request';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    if (response.status !== 200 && response.status !== 204) throw new Error(response.statusText);
    else return { status: response.status, message: response.statusText };
  }
  if (response.status !== 200 && response.status !== 204) {
    throw new Error(data.error);
  }
  return data;
};

export const registerUser = (params) => post(`${baseUrl}${urls.register}`, params).then(handleResponse);

export const loginUser = (params) => {
  const url = `${baseUrl}${urls.login}`;
  return post(url, params).then(handleResponse);
};

export const updateCompanyProfile = (params) => {
  const url = `${baseUrl}${urls.updateCompanyProfile}`;
  return post(url, params).then(handleResponse);
};

export const getChatRooms = (userId, type) => {
  const url = `${baseUrl}indeed/api/chatRooms/user/${userId}?type=${type}`;
  return get(url).then(handleResponse);
};

export const getConversations = (chatRoomId) => {
  const url = `${baseUrl}indeed/api/chatRoom/${chatRoomId}/messages`;
  return get(url).then(handleResponse);
};

export const postConversation = (payload) => {
  const url = `${baseUrl}indeed/api/messages`;
  return post(url, payload).then(handleResponse);
};
export const getAllJobs = (params) => {
  const url = `${baseUrl}${urls.getAllJobs}?page=${params.page}&limit=${params.limit}`;
  return get(url, params).then(handleResponse);
};

export const getSpecificJob = (params) => {
  const url = `${baseUrl}${urls.getSpecificJob}/${params.companyId}/jobs/${params.jobId}`;
  return get(url, params).then(handleResponse);
};

export const getSearchedJobs = (params) => {
  const url = `${baseUrl}${urls.getSearchedJobs}?what=${
    params.what || ''
  }&where=${params.where || ''}&page=${params.page}&limit=${params.limit}`;
  return get(url, params).then(handleResponse);
};

export const saveJob = (params) => {
  const url = `${baseUrl}${urls.saveJob}/${params.jobId}/saveJob`;
  return post(url, params).then(handleResponse);
};

export const unsaveJob = (params) => {
  const url = `${baseUrl}${urls.saveJob}/${params.jobId}/undoSaveJob`;
  return post(url, params).then(handleResponse);
};

export const getCompanyJobs = (params) => {
  const url = `${baseUrl}${urls.getCompanySpecificJobs}/${params.companyId}/jobs?page=${params.page}&limit=${params.limit}`;
  return get(url, params).then(handleResponse);
};

export const postReviews = (params) => {
  const url = `${baseUrl}${urls.postReview}/${params.companyId}/reviews`;
  return post(url, params).then(handleResponse);
};

export const postJob = (params) => {
  const url = `${baseUrl}indeed/api/company/${params.companyId}/jobs`;
  return post(url, params).then(handleResponse);
};

export const getReviews = (params) => {
  const url = `${baseUrl}${urls.getReviews}/${params.companyId}/reviews?sort=${params.sort}&order=${params.order}&page=${params.page}&limit=${params.limit}&user=${params.userId}`;
  return get(url, params).then(handleResponse);
};

export const imageUpload = (files, userId) => {
  const url = `${baseUrl}${urls.imageUpload}`;
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file.file);
    formData.append('caption', file.caption || '');
    formData.append('location', file.location || '');
  });
  formData.append('userId', userId);
  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then(handleResponse);
};

export const uploadCompanyPhotos = ({ companyId, pictures }) => {
  const url = `${baseUrl}${urls.uploadCompanyPhotos.replace(
    '{companyId}',
    companyId,
  )}`;
  return post(url, pictures).then(handleResponse);
};

export const getCompanyDetailsByEmployerId = (employerId) => {
  const url = `${baseUrl}${urls.getCompanyDetailsByEmployerId.replace(
    '{employerid}',
    employerId,
  )}`;
  return get(url).then(handleResponse);
};

export const getUserDetailsWithId = (userId) => {
  const url = `${baseUrl}${urls.getUserDetailsWithId.replace(
    '{userId}',
    userId,
  )}`;
  return get(url).then(handleResponse);
};

export const getCompanyProfileByCompanyId = (companyId) => {
  const url = `${baseUrl}${urls.getCompanyDetailsByCompanyId.replace(
    '{companyId}',
    companyId,
  )}`;
  return get(url).then(handleResponse);
};

export const postInitialConversation = async (room, message) => {
  const chatRoomUrl = `${baseUrl}indeed/api/chatRooms`;
  const response = await post(chatRoomUrl, room).then(handleResponse);
  const payload = { ...message, chatRoomId: response.chatRoomId };
  postConversation(payload);
  return response;
};

export const makeReviewFeatured = (params) => {
  const url = `${baseUrl}${urls.featureReview}/${params.reviewId}/company/${params.companyId}/feature`;
  return post(url, params).then(handleResponse);
};

export const getFeaturedReviews = (params) => {
  const url = `${baseUrl}${urls.fetchFeatured}/${params.companyId}/users/${params.userId}/reviews`;
  return get(url, params).then(handleResponse);
};

export const findSalaries = (what, where) => {
  const url = `${baseUrl}${urls.findSalaries}?what=${what}&where=${where}`;
  return get(url).then(handleResponse);
};

export const uploadResume = (params) => {
  const url = `${baseUrl}${urls.uploadResume}`;
  return postResume(url, params).then(handleResponse);
};

export const helpful = (params) => {
  const url = `${baseUrl}${urls.reviewHelpful}/${params.reviewId}/helpfullness`;
  return post(url, params).then(handleResponse);
};

export const getUserData = (userId) => {
  const url = `${baseUrl}${urls.getProfile}/${userId}`;
  return get(url, userId).then(handleResponse);
};

export const updateUserProfile = (params) => {
  const url = `${baseUrl}${urls.updateUserProfile}/${params.userId}`;
  return post(url, params).then(handleResponse);
};

export const applyForaJob = (params) => {
  const url = `${baseUrl}${urls.applyJob}/${params.jobSeekerId}/applyJob/${params.jobId}/${params.companyId}`;
  return post(url, params).then(handleResponse);
};

export const downloadFile = (url, fileName = 'resume.pdf') => get(url)
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  .then((objectUrl) => {
    const downloadLink = window.document.createElement('a');
    downloadLink.href = objectUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  })
  .then(handleResponse);
