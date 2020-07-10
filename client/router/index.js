import Course from '../views/CourseOverview.vue';
import Dashboard from '../views/Dashboard';
import Layout from '../components/common/Layout';
import Login from '../views/Login';
import paths from './paths';
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: paths.home,
    component: Layout,
    meta: {
      protectedRoute: true
    },
    children: [{
      path: '',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: paths.courses,
      name: 'Course',
      component: Course
    }]
  },
  {
    path: paths.login,
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
  const isUserLoggedIn = !!store.state.auth.token;

  if (isLoginRoute && isUserLoggedIn) {
    next(paths.home);
  }

  if (isProtectedRoute && !isUserLoggedIn) {
    next(paths.login);
  }

  next();
});

export default router;
