import { email, required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('email', email);

extend('required', required);

extend('min', {
  validate(value, { min }) {
    return value.length >= min || 'The {_field_} field has to contain more than {min} letters';
  },
  params: ['min']
});

extend('lengthBetween', {
  validate(value, { min, max }) {
    if (value.length <= min) {
      return 'The {_field_} field has to contain more than {min} characters';
    } else if (value.length >= max) {
      return 'The {_field_} field has to contain less than {max} characters';
    }
    return true;
  },
  params: ['min', 'max']
});

extend('uniqueCourse', {
  async validate(name, { checkName }) {
    const isValid = checkName(name);
    return isValid || 'The name is taken';
  },
  params: ['checkName']
});
