import { isEmpty } from 'lodash';

const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 
 * @param {any}
 * 
 * @returns {object} error and valid  
 */
const validateSignup = ({ firstName, lastName, email, jobDescription, password }: any) => {
  const error: any = [];

  if (firstName.trim() === '' || firstName === undefined) {
    const firstNameError = {
      message: 'Please enter your first name.'
    }
    error.push(firstNameError);
  }
  if (lastName.trim() === '' || lastName === undefined) {
    const lastNameError = { message: 'Please enter your last name.'};
    error.push(lastNameError);
  }
  if (email.trim() === ''
  || lastName === undefined || !validEmail.test(email)) {
    const emailError = {
      message: 'Please enter a valid email address.'
    }
    error.push(emailError);
  }
  if (jobDescription.trim() === ''
  || jobDescription === undefined) {
    const jobError = {
      message: 'Your job description is required.'
    }
    error.push(jobError);
  }
  if (password.trim() === ''
  || password === undefined || password.length <= 8) {
    const passwordError = {
      message: 'Your password should be greater than 8 characters'
    }
    error.push(passwordError);
  }

  return {
    error,
    valid: error.length
  };
};

export default validateSignup;
