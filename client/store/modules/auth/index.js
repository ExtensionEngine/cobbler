import * as actions from './actions';
import * as mutations from './mutations';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

const state = {
  token: token || null,
  user: token ? jwtDecode(token) : null
};

export default {
  state,
  actions,
  mutations
};
