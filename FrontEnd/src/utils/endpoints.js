import { baseUrl, urls } from './constants';
import { post } from './request';

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

export const loginUser = () => {};
