import Home from '../views/Home';
import Login from '../views/Login';
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      protectedRoute: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authRoute: true
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
    next('/');
  }

  if (isProtectedRoute && !isUserLoggedIn) {
    next('/login');
  }

  next();
});

export default router;
