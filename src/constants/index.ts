export const { API_URL } = process.env;

export const DATE_FORMAT_SHORT = 'MM/DD/YYYY';
export const EXPIRATION_PERIOD_UNIT = 'Hours';
export const CURRENCY = '$';
export const PAGINATION_ITEMS_PER_PAGE = 20;

export const LOCAL_STORAGE_KEYS = {
  accessToken: 'accessToken',
  accessTokenExpirationDate: 'accessTokenExpirationDate',
  refreshToken: 'refreshToken',
  roles: 'roles',
};

export const TIMESPAN_MAP_KEYS: { [key: string]: string } = {
  years: 'y',
  months: 'm',
  days: 'd',
  hours: 'h',
  minutes: 'min',
};

export const TIMESPAN_MAP_KEYS_ORDER = [
  'minutes',
  'hours',
  'days',
  'months',
  'years',
];

export const NOT_DIGIT = /[^0-9.]/;
