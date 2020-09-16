import _ from 'lodash';

import { validateEmail, validateUsername, validatePassword, validateRepeatPassword } from "./utils";


export default function (useName, email, password, repeatPassword ) {
  let error = {};

  const userNameError = validateUsername(useName, 'Username', 0, 10);
  if (userNameError) {
    error.userName = userNameError;
  }

  const emailError = validateEmail(email);
  if (emailError) {
    error.email = emailError;
  }

  const passwordError = validatePassword(password, 'Password', 5, 10);
  if (passwordError) {
    error.password = passwordError;
  }

  const repeatPasswordError = validateRepeatPassword(repeatPassword, password, 'Repeat password');
  if (repeatPasswordError) {
    error.repeatPassword = repeatPasswordError;
  }

  return _.isEmpty(error) ? undefined : error;
}
