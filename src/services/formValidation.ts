const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&`]).{8,}$/;
const PASSWORD_ERROR_MESSAGE = `Password should pass next requirements: Minimum eight characters, at least one
    uppercase letter, one lowercase letter, one number and one special character
`;

// Validators helpers BEGIN
export const validateIsNotEmpty = (
  value: string | number,
  errors: IErrors,
  key: string,
  name: string,
): IErrors => {
  const preparedValue = value !== 0 && !value ? '' : value;

  if (!String(preparedValue).trim()) {
    return {
      ...errors,
      [key]: `${name} Field should be not empty`,
    };
  }

  return errors;
};

export const validateShouldBeNotEqualTo = (
  value: string,
  errors: IErrors,
  key: string,
  name: string,
  checkString: string,
): IErrors => {
  if (value === checkString) {
    return {
      ...errors,
      [key]: `${name} Field should be not equal "${checkString}"`,
    };
  }

  return errors;
};

export const validateShouldNotStartFrom = (
  value: string,
  errors: IErrors,
  key: string,
  name: string,
  checkString: string,
): IErrors => {
  if (String((value || '')).charAt(0) === checkString) {
    return {
      ...errors,
      [key]: `${name} Field should not start from "${checkString}"`,
    };
  }

  return errors;
};

export const validateIsRequired = (
  value: any,
  errors: IErrors,
  key: string,
  name: string,
): IErrors => {
  if (!value) {
    return {
      ...errors,
      [key]: `${name} Field is required`,
    };
  }

  return errors;
};

export const validateMinLength = (
  value: string,
  errors: IErrors,
  minLength: number,
  key: string,
  name: string,
): IErrors => {
  if (String(value || '').length < minLength) {
    return {
      ...errors,
      [key]: `${name} should contain at least ${minLength} chars`,
    };
  }

  return errors;
};

export const validateEmail = (value: string, errors: IErrors, key: string): IErrors => {
  if (!EMAIL_REGEXP.test(String(value || ''))) {
    return {
      ...errors,
      [key]: 'Please make sure that you typed correct email',
    };
  }

  return errors;
};

export const validatePassword = (value: string, errors: IErrors, key: string): IErrors => {
  if (!PASSWORD_REGEXP.test(String(value || ''))) {
    return {
      ...errors,
      [key]: PASSWORD_ERROR_MESSAGE,
    };
  }

  return errors;
};
// Validator helpers END

// Forms validators BEGIN
// Forms validators END

interface IErrors {
  [key: string]: string,
}
