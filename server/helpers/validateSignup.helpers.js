import { isEmpty } from 'lodash';

const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateSignup = (value) => {
  const error = {};
  if (value.firstName.trim() === '' || value.firstName === undefined) {
    error.firstName = 'Please enter your first name.';
  }
  if (value.lastName.trim() === '' || value.lastName === undefined) {
    error.lastName = 'Please enter your last name.';
  }
  if (value.email.trim() === ''
  || value.lastName === undefined || !validEmail.test(value.email)) {
    error.email = 'Please enter a valid email address.';
  }
  if (value.jobDescription.trim() === ''
  || value.jobDescription === undefined) {
    error.jobDescription = 'Your job description is required.';
  }
  if (value.password.trim() === ''
  || value.password === undefined || value.password.length <= 8) {
    error.password = 'Your password should be greater than 8 characters';
  }

  return {
    error,
    valid: isEmpty(error)
  };
};

export default validateSignup;
