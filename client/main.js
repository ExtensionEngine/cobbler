import App from './App';
import { configureAxios } from './api/common';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;

configureAxios();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
