import { NOT_DIGIT } from '../constants';

export const replaceNonDigits = value => (
  value.replace(new RegExp(NOT_DIGIT.source, 'g'), '')
);

export const capitalize = (value) => {
  const string = value === undefined || value === null ? '' : value.toString();
  const firstChar = string.charAt(0);
  const remnant = string.slice(1, string.length);

  return firstChar.toUpperCase() + remnant;
};
