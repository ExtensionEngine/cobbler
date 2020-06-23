import './api/common';
import './utils/validate';
import App from './App';
import router from './router';
import store from './store';
import Toasted from 'vue-toasted';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.use(Toasted, {
  theme: 'outline',
  position: 'bottom-center',
  duration: 3000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
