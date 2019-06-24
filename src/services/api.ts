// TODO: Improve types of this file

import queryString from 'query-string';
import { API_URL, LOCAL_STORAGE_KEYS } from '../constants';

export interface IAPIResponse {
    response: any,
    data?: any,
}

export const getUrl = (path: string, queryParams: { [key: string]: string }): string => {
    const search = queryString.stringify(queryParams);

    return (
        `${API_URL}${path}${search ? `?${search}` : ''}`
    );
};

export const preProcessResponse = (response: any) => {
    const { status } = response;

    return new Promise((resolve, reject) => {
        const result: IAPIResponse = {
            response,
            data: null,
        };

        response.text().then((text: string) => {
            result.data = JSON.parse(text || 'null');

            if (status >= 200 && status < 300) {
                resolve(result);
            } else {
                reject(result);
            }
        }).catch(reject);
    });
};

export const requestAPI = (url: string, method = 'GET', body: any, requestHeaders = {}) => {
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
