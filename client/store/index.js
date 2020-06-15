import auth from './modules/auth';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {
  auth
};

export default new Vuex.Store({
  modules
});
