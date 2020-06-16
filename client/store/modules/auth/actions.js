import { login as loginRequest } from '../../../api/auth';

export const login = ({ commit }, credentials) => {
  return loginRequest(credentials)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        return commit('login', data.token);
      });
};

export const logout = ({ commit }) => {
  localStorage.removeItem('token');
  commit('logout');
};
