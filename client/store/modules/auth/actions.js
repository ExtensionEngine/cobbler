import { login as loginRequest } from '../../../api/auth';

export const login = ({ commit }, credentials) => {
  return loginRequest(credentials)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return commit('login', token);
      });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit('logout');
};
