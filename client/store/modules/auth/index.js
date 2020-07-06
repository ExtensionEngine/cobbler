import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

let state;
try {
  state = {
    token: token || null,
    email: token ? jwtDecode(token).sub : null,
    role: token ? jwtDecode(token).role : 'GUEST'
  };
} catch (err) {
  state = {
    token: null,
    email: null,
    role: 'GUEST'
  };
}

export default {
  state,
  actions,
  getters,
  mutations
};
