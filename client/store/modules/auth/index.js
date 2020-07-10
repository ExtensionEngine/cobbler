import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
let state;

try {
  const { role, sub } = jwtDecode(token);
  state = {
    token,
    email: sub,
    role
  };
} catch (err) {
  localStorage.removeItem('token');
  state = {
    token: null,
    email: null,
    role: null
  };
}

export default {
  state,
  actions,
  getters,
  mutations
};
