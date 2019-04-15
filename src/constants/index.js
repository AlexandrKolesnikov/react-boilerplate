export const DEV_API_URL = 'http://5d610517beb5.sn.mynetname.net:55555/api';
export const PROD_API_URL = 'http://194.28.87.163:5002/api';
export const API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;

// export const API_URL = 'http://localhost:39373/api';
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

export const TIMESPAN_MAP_KEYS = {
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
