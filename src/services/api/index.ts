import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { API_HOST, LocalStorageKeys } from '../../constants';
import { IAPIErrorResponseBody } from './types';

type makeRequest = <T>(url: string, data?: any, method?: 'POST' | 'GET' | 'PUT' | 'DELETE', headers?: Headers) => Promise<AxiosResponse<T>>;

export const getUrl = (path: string, queryParams: { [key: string]: any } = {}): string => {
  const search = queryString.stringify(queryParams);

  return (
    `${API_HOST}${path}${search ? `?${search}` : ''}`
  );
};

export const processApiResponseError = (
  error: AxiosError<IAPIErrorResponseBody>,
  defaultErrorMessage = 'Oops! Something went wrong. Please try again later.',
  additionMessage = '',
) => {
  const { response } = error;
  let errorMessage = response?.data?.message || defaultErrorMessage;

  if (additionMessage) {
    errorMessage += `\n\n${additionMessage}`;
  }

  // eslint-disable-next-line no-param-reassign
  error.message = errorMessage;

  throw error;
};

export const makeRequest: makeRequest = (url, data, method = 'GET', headers = undefined) => {
  const isFormData = data instanceof FormData;

  const requestHeaders = {
    accept: 'application/json',
    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json;charset=utf-8',
    Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.accessToken)}`,
    ...headers,
  };

  const requestConfig = {
    headers: requestHeaders,
    method,
    data: isFormData ? data : JSON.stringify(data),
  };

  return axios(url, requestConfig)
    .catch(processApiResponseError);
};
