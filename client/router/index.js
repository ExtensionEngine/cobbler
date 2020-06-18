import Home from '../views/Home';
import Login from '../views/Login';
import paths from './paths';
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: paths.home,
    name: 'Home',
    component: Home,
    meta: {
      protectedRoute: true,
      layout: 'default'
    }
  },
  {
    path: paths.login,
    name: 'Login',
    component: Login,
    meta: {
      authRoute: true,
      layout: 'login'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLoginRoute = to.matched.some(it => it.meta.authRoute);
  const isProtectedRoute = to.matched.some(it => it.meta.protectedRoute);
  const isUserLoggedIn = store.state.auth.token;

  if (isLoginRoute && isUserLoggedIn) {
    next(routes.home);
  }

  if (isProtectedRoute && !isUserLoggedIn) {
    next(routes.login);
  }

  store.dispatch('changeLayout', to.meta.layout);

  next();
});

export default router;
