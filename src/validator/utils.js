import validator from 'validator';

import { INVALID_EMAIL_FORMAT, EMAIL_REQUIRED, USERNAME_REQUIRED,
  } from "./message";


export function validateEmail(value, canEmpty = false) {
  if (!canEmpty && validator.isEmpty(value)) {
    return EMAIL_REQUIRED;
  } else if (!validator.isEmail(value)) {
    return INVALID_EMAIL_FORMAT;
  } else
  return undefined;
}

export function validateUsername(value, fieldName, minLength, maxLength) {
  return validateStringCommon(value, fieldName, minLength, maxLength)
}

export function validatePassword(value, fieldName, minLength, maxLength) {
  return validateStringCommon(value, fieldName, minLength, maxLength)
}

export function validateRepeatPassword(repeatPassword, password, fieldName) {
  if (validator.isEmpty(repeatPassword)) {
    return `${fieldName} is required`;
  }  else if (repeatPassword !== password) {
    return 'Password and Repeat password is not equal'
  }
  return undefined;
}

export function validateStringCommon(value, fieldName, minLength, maxLength) {
  if (validator.isEmpty(value)) {
    return `${fieldName} is required`;
  } else if (minLength && value.length < minLength) {
    return `${fieldName} must longer than ${minLength} character`;
  } else if (maxLength && value.length > maxLength) {
    return `${fieldName} must shorter than ${maxLength} character`;
  }
  return undefined;
}
