import './api';
import './utils/validate';
import './utils/toast';
import './utils/filters';
import App from './App';
import breakPointPlugin from './utils/breakPointPlugin';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.use(breakPointPlugin, { xs: '480px', sm: '768px', md: '1024px', lg: '1200px' });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
