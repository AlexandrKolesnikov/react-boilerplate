import { all, call } from 'redux-saga/effects';

const parseErrorMessages = responseData => (
  Object.keys(responseData || {}).reduce((accumulator, key) => {
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

export function* handleError(error, defaultMessage) {
  console.error(error); // eslint-disable-line
  const { data } = error || {};
  const parsedErrorMessages = parseErrorMessages(data);
  const notifications = parsedErrorMessages.length ? parsedErrorMessages : [defaultMessage];

  yield all(notifications.map(notification => (
    call(console.error, notification)
  )));
}
