import auth from './modules/auth';
import courses from './modules/courses';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {
  auth, courses
};

export default new Vuex.Store({
  modules
});
