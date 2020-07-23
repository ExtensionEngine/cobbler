import './api';
import './utils/validate';
import './utils/toast';
import './utils/filters';
import App from './App';
import breakPointPlugin from './utils/breakPointPlugin';
import router from './router';
import store from './store';
import Vue from 'vue';

const opts = {
  isPhone: 'screen and (min-width: 480px)',
  isTablet: 'screen and (min-width: 762px)',
  isDesktop: 'screen and (min-width: 1200px)',
  isSmallScreen: 'screen and (min-width: 1024px)'
};

Vue.use(breakPointPlugin, opts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
