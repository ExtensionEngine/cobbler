import './api';
import './utils/validate';
import './utils/toast';
import './utils/filters';
import App from './App';
import router from './router';
import store from './store';
import Vue from 'vue';

const tabletQuery = window.matchMedia('screen and (min-width: 768px)');
const smallScreenQuery = window.matchMedia('screen and (min-width: 1024px)');

Vue.prototype.$isTablet = tabletQuery.matches;
Vue.prototype.$isSmallScreen = smallScreenQuery.matches;

tabletQuery.addListener(mediaQueryList => {
  Vue.prototype.$isTablet = mediaQueryList.matches;
});
smallScreenQuery.addListener(mediaQueryList => {
  Vue.prototype.$isSmallScreen = mediaQueryList.matches;
});

// Vue.util.defineReactive(this, '$isTablet', tabletQuery.matches);
// Vue.util.defineReactive(this, '$isSmallScreen ', smallScreenQuery.matches);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
