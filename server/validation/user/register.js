const Validator = require('validator');
const isEmpty = require( "../is-empty");

module.exports = function validateRegisterInput(formData, e) {
  let errors = {}

  // ensure empty string if empty
  formData.email = !isEmpty(formData.email) ? formData.email : '';
  formData.password = !isEmpty(formData.password) ? formData.password : '';
  formData.confirmation = !isEmpty(formData.confirmation) ? formData.confirmation : '';

  // email validations
  if (!Validator.isEmail(formData.email)) {
    errors.email = 'invalid email'
  }
  if (Validator.isEmpty(formData.email)) {
    errors.email = 'email field is required'
  }
  if (e.name === 'MongoError' && e.code === 11000) {
    errors.email = 'email in use'
  }

  // password validations
  if (!Validator.isLength(formData.password, { min: 8, max: 30 })) {
    errors.password = 'password must be between 8 and 30 characters'
  }
  if (Validator.isEmpty(formData.password)) {
    errors.password = 'password field is required'
  }

  // password confirmation validations
  if (!Validator.equals(formData.password, formData.confirmation)) {
    errors.confirmation = 'password confirmation does not match password'
  }
  if (Validator.isEmpty(formData.confirmation)) {
    errors.confirmation = 'password confirmation field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
