import auth from './modules/auth';
import layout from './modules/layout';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {
  auth,
  layout
};

export default new Vuex.Store({
  modules
});
