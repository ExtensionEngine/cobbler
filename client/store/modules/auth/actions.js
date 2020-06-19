import jwtDecode from 'jwt-decode';
import { login as loginRequest } from '../../../api/auth';
import paths from '../../../router/paths';
import router from '../../../router';

export const login = ({ commit }, credentials) => {
  return loginRequest(credentials)
  .then(({ data }) => {
    localStorage.setItem('token', data.token);
    return commit('login', { token: data.token, user: jwtDecode(data.token) });
  });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit('logout');
  router.push(paths.login);
};
