import jwtDecode from 'jwt-decode';
import { login as loginRequest } from '../../../api/auth';
import paths from '../../../router/paths';
import router from '../../../router';

export const login = ({ commit }, credentials) => {
  return loginRequest(credentials)
  .then(({ data: token }) => {
    localStorage.setItem('token', token);
    const { sub: email, role } = jwtDecode(token);
    return commit('login', { token, email, role });
  });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit('logout');
  router.push(paths.login);
};
