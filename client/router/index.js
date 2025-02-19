import AddCourse from '../views/Lecturer/AddCourse';
import AdminDashboard from '../views/Admin/Dashboard';
import Course from '../views/CourseOverview.vue';
import curry from 'lodash/curry';
import Dashboard from '../views/Dashboard';
import EditCourse from '../views/Lecturer/EditCourse';
import every from 'lodash/every';
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
      name: 'lecturer-dashboard',
      component: LecturerDashboard,
      meta: {
        roles: ['LECTURER']
      }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: paths.courses,
      name: 'Course',
      component: Course
    },
    {
      path: paths.lecturer.addCourse,
      name: 'add-course',
      component: AddCourse,
      meta: {
        roles: ['LECTURER']
      }
    }, {
      path: paths.lecturer.editCourse,
      name: 'edit-course',
      component: EditCourse,
      meta: {
        roles: ['LECTURER']
      }
    }, {
      path: paths.learner.base,
      name: 'learner-dashboard',
      component: LearnerDashboard,
      meta: {
        roles: ['LEARNER']
      }
    }, {
      path: paths.admin.base,
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: {
        roles: ['ADMIN']
      }
    }]
  },
  {
    path: paths.login,
    name: 'login',
    component: Login
  },
  {
    path: paths.forbidden,
    name: 'forbidden',
    component: Forbidden
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const { role } = store.state.auth;
  const isAuthorized = every(to.matched, isRouteAllowedByRole(role));

  if (!isAuthorized) {
    next(paths.forbidden);
  }

  next();
});

export function getBasepath() {
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

const isRouteAllowedByRole = curry((role, route) =>
  !route.meta.roles || route.meta.roles.includes(role));
