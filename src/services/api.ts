import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { API_URL, LocalStorageKeys } from '../constants';

type makeRequest = <T>(url: string, data?: any, method?: 'POST' | 'GET' | 'PUT' | 'DELETE', headers?: Headers) => Promise<AxiosResponse<T>>;

export const getUrl = (path: string, queryParams: { [key: string]: string }): string => {
  const search = queryString.stringify(queryParams);

  return (
    `${API_URL}${path}${search ? `?${search}` : ''}`
  );
};

export const processApiResponseError = (
  error: AxiosError,
  defaultErrorMessage = 'Oops! Something went wrong. Please try again later.',
  additionMessage = '',
) => {
  let errorMessage = defaultErrorMessage;

  if (error.response) {
    // TODO: Implement API specific error messages ejecting
  }

  if (additionMessage) {
    errorMessage += `\n\n${additionMessage}`;
  }

  // eslint-disable-next-line no-param-reassign
  error.message = errorMessage;

  throw error;
};

export const makeRequest: makeRequest = (url, data, method = 'GET', headers = undefined) => {
  const requestHeaders = {
    accept: 'application/json',
    'content-type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
    ...headers,
  };

  const requestConfig = {
    headers: requestHeaders,
    method,
    data: JSON.stringify(data),
  };

  return axios(url, requestConfig);
};
