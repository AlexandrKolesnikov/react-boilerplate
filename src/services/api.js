import queryString from 'query-string';
import { API_URL, LOCAL_STORAGE_KEYS } from '../constants';

export const getUrl = (path, queryParams) => {
  const search = queryString.stringify(queryParams);

  return (
    `${API_URL}${path}${search ? `?${search}` : ''}`
  );
};

export const preProcessResponse = (response) => {
  const { status } = response;

  return new Promise((resolve, reject) => {
    const result = {
      response,
    };

    response.text().then((text) => {
      result.data = JSON.parse(text || null);

      if (status >= 200 && status < 300) {
        resolve(result);
      } else {
        reject(result);
      }
    }).catch(reject);
  });
};

export const requestAPI = (url, method = 'GET', body, requestHeaders = {}) => {
  const makeRequest = () => {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken)}`,
      ...requestHeaders,
    };

    return (
      fetch(url, {
        headers,
        method,
        body: JSON.stringify(body),
      }).then(preProcessResponse)
    );
  };

  return makeRequest();
};
