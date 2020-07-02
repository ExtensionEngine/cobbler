import AddCourse from '../views/Lecturer/AddCourse';
import AdminDashboard from '../views/Admin/Dashboard';
import Forbidden from '../views/Forbidden';
import Layout from '../components/common/Layout';
import LearnerDashboard from '../views/Learner/Dashboard';
import LecturerDashboard from '../views/Lecturer/Dashboard';
import Login from '../views/Login';
import paths from './paths';
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: paths.base,
    component: Layout,
    children: [{
      path: paths.lecturer.base,
      name: 'Lecturer dashboard',
      component: LecturerDashboard,
      meta: {
        roles: ['LECTURER']
      }
    }, {
      path: paths.lecturer.addCourse,
      name: 'Add course',
      component: AddCourse,
      meta: {
        roles: ['LECTURER']
      }
    }, {
      path: paths.learner.base,
      name: 'Learner dashboard',
      component: LearnerDashboard,
      meta: {
        roles: ['LEARNER']
      }
    }, {
      path: paths.admin.base,
      name: 'Admin dashboard',
      component: AdminDashboard,
      meta: {
        roles: ['ADMIN']
      }
    }]
  },
  {
    path: paths.login,
    name: 'Login',
    component: Login,
    meta: {
      roles: ['GUEST']
    }
  },
  {
    path: paths.forbidden,
    name: 'Forbidden',
    component: Forbidden,
    meta: {
      roles: ['GUEST', 'LEARNER', 'LECTURER', 'ADMIN']
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const { role } = store.state.auth;
  const isAuthorized = to.matched.some(({ meta }) =>
    meta.roles && meta.roles.includes(role));

  if (!isAuthorized) {
    next(paths.forbidden);
  }

  next();
});

export function getBasePath() {
  switch (store.state.auth.role) {
    case 'ADMIN':
      return paths.admin.base;
    case 'LECTURER':
      return paths.lecturer.base;
    case 'LEARNER':
      return paths.learner.base;
    default:
      return paths.login;
  }
}

export default router;
