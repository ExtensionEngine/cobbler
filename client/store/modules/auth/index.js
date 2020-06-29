import * as actions from './actions';
import * as mutations from './mutations';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

const state = {
  token: token || null,
  email: token ? jwtDecode(token).sub : null,
  role: token ? jwtDecode(token).role : 'GUEST'
};

export default {
  state,
  actions,
  mutations
};
