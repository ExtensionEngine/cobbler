import router from '../router';
import store from '../store';
import thwack from 'thwack';

export const endpoints = {
  auth: {
    login: 'login'
  },
  course: {
    base: 'courses',
    custom: params => `courses?${params}`,
    byId: id => `courses/${id}`,
    enroll: id => `courses/${id}/enroll`
  },
  enroll: {
    base: 'enroll'
  },
  categories: {
    base: 'categories'
  }
};

const configureThwack = () => {
  thwack.defaults.baseURL = process.env.VUE_APP_API_HOST;

  thwack.addEventListener('request', event => {
    const token = store.state.auth.token;
    if (token) {
      event.options.headers = {
        ...event.options.headers,
        Authorization: 'JWT ' + token
      };
    }
  });

  thwack.addEventListener('error', event => {
    const { status } = event.thwackResponse;

    if (status === 401) {
      store.dispatch('logout');
      router.push('/login');
    }

    if (status === 403) {
      throw Error('Forbidden request');
    }
  });
};

configureThwack();

export default thwack;
