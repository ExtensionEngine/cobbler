import './api/common';
import './utils/validate';
import App from './App';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
