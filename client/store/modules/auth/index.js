import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  token: localStorage.getItem('token') || null
};

export default {
  state,
  actions,
  mutations
};
