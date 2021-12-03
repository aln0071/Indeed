export const post = (url, body, headers = {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
});

export const postResume = (url, body, headers = {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'multipart/form-data',
    ...headers,
  },
});

export const get = (url) => fetch(url);
