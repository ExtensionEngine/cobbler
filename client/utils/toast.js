import Toasted from 'vue-toasted';
import Vue from 'vue';

Vue.use(Toasted, {
  theme: 'outline',
  position: 'bottom-center',
  duration: 3000,
  singleton: true
});

Vue.toasted.register('formSuccess', ({ message }) => message || 'Form submit was successful!', {
  type: 'success'
});

Vue.toasted.register('formSubmitting', ({ message }) => message || 'Submitting form...', {
  type: 'info'
});

Vue.toasted.register('formError', ({ message }) => message || 'Form submit failed!', {
  type: 'error'
});
