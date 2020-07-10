import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

let decodedToken;

if (token) {
  decodedToken = jwtDecode(token);
}

const state = {
  token: token || null,
  email: token ? decodedToken.sub : null,
  role: token ? decodedToken.role : 'GUEST'
};

export default {
  state,
  actions,
  getters,
  mutations
};
