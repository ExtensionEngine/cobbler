import axios from 'axios';
import store from '../store';
export const base = '/api';

const userBase = `${base}/user`;

export const endpoints = {
  user: {
    login: `${userBase}/login`
  }
};

export const configureAxios = () => {
  axios.interceptors.request.use(
    config => {
      const token = store.state.auth.token;
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  // TODO: Test this interceptor once connected to backend
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch('logout');
        history.push('/login');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
