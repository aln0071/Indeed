import { baseUrl, urls } from './constants';
import { post, get } from './request';

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

// export const saveJob = (params) => {
//   const url = `${baseUrl}${urls.login}`;
//   return post(url, params).then(handleResponse);
// };

// export const unsaveJob = (params) => {
//   const url = `${baseUrl}${urls.login}`;
//   return post(url, params).then(handleResponse);
// };

// export const storeSearched = (params) => {
//   const url = `${baseUrl}${urls.login}`;
//   return post(url, params).then(handleResponse);
// };
