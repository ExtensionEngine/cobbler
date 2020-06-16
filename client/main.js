import App from './App';
import { configureThwack } from './api/common';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;

configureThwack();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
