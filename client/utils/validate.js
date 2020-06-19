import { email, required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('email', email);

extend('required', required);

extend('min', {
  validate(value, { min }) {
    return value.length >= min || 'The {_field_} field has to contain atleast {min} letters';
  },
  params: ['min']
});
