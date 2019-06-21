import { all, call } from 'redux-saga/effects';
import { IAPIResponse } from "./api";


const parseErrorMessages = (responseData: { [key: string]: any }) => (
  Object.keys(responseData || {}).reduce((accumulator: string[], key) => {
    const item = responseData[key];
    let result = '';

    if (Array.isArray(item)) {
      result = item.join('\n');
    } else if (typeof item === 'string') {
      result = item;
    }

    if (!result.trim()) {
      return accumulator;
    }

    return [...accumulator, result];
  }, [])
);

export function* handleError(error: IAPIResponse, defaultMessage: string) {
  console.error(error); // eslint-disable-line
  const { data } = error || <IAPIResponse>{};
  const parsedErrorMessages = parseErrorMessages(data);
  const notifications: string[] = parsedErrorMessages.length ? parsedErrorMessages : [defaultMessage];

  yield all(notifications.map(notification => (
    call(console.error, notification)
  )));
}
