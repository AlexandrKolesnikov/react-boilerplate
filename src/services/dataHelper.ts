// TODO: Complete types for this file

import _findIndex from 'lodash/findIndex';
import moment, {Moment} from 'moment';
import objectDiff from 'object-diff';
import { TIMESPAN_MAP_KEYS, TIMESPAN_MAP_KEYS_ORDER } from '../constants';

type TimeSpanShapeType = {
  [key: string]: string | number,
}

export const encodeStringToBase64 = (string: string): string => (
  btoa(encodeURIComponent(string)
    .replace(
      /%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(Number.parseInt(`0x${p1}`)),
    ))
);

export const getItemById = (id: string | number, items: Array<any>, key = 'id') => {
  const itemIndex = _findIndex(items, item => id === item[key]);

  return {
    itemIndex,
    item: items[itemIndex] || null,
  };
};

export const convertTimeSpanShapeToString = (data: TimeSpanShapeType): string => (
  TIMESPAN_MAP_KEYS_ORDER.reduce((accumulator, key) => {
    const stringKey = TIMESPAN_MAP_KEYS[key];
    const value = (data || {})[key];

    if (!value) {
      return accumulator;
    }

    const part = `${value}${stringKey}`;

    if (!accumulator) {
      return part;
    }

    return `${accumulator}:${part}`;
  }, '')
);

export const generateTimeSpanShape = (fromDate: string | number | Moment, toDate: string | number | Moment): TimeSpanShapeType => {
  const dateStart = moment(fromDate);
  const dateEnd = moment(toDate);

  const months = dateEnd.diff(dateStart, 'months');
  dateStart.add(months, 'months');

  const days = dateEnd.diff(dateStart, 'days');
  dateStart.add(days, 'days');

  const hours = dateEnd.diff(dateStart, 'hours');
  dateStart.add(hours, 'hours');

  const minutes = dateEnd.diff(dateStart, 'minutes');

  return {
    months,
    days,
    hours,
    minutes,
  };
};

export const addMomentTimezoneOffset = (date: Moment, clone = true, inverseOffset = false): Moment => {
  const result = clone ? date.clone() : date;
  const currentDate = moment();
  const timezoneOffset = currentDate.utcOffset() * (inverseOffset ? -1 : 1);

  result.add(timezoneOffset, 'minutes');

  return result;
};

export const getChangedData = <T = object>(initialValues: T, data: T) => objectDiff(initialValues || {}, data || {});
