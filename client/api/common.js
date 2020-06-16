import router from '../router';
import store from '../store';
import thwack from 'thwack';
export const base = '/api/v1';

const userBase = `${base}`;

export const endpoints = {
  user: {
    login: `${userBase}/login`
  }
};

export const configureThwack = () => {
  thwack.defaults.baseURL = 'http://localhost:3000';

  thwack.addEventListener('request', event => {
    const token = store.state.auth.token;
    if (token) {
      event.options.headers = {
        Authorization: 'JWT ' + token
      };
    }
  });

  thwack.addEventListener('response', event => {
    const { status } = event.thwackResponse;

    if (status === 401 || status === 403) {
      store.dispatch('logout');
      router.push('/login');
    }
  });
};
