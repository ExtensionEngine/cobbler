import paths from '../router/paths';
import router from '../router';
import store from '../store';
import thwack from 'thwack';

const base = '/api/v1';

export const endpoints = {
  auth: {
    login: `${base}/login`
  }
};

export const configureThwack = () => {
  thwack.defaults.baseURL = process.env.VUE_APP_API_HOST;

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
      router.push(paths.login);
    }
  });
};
