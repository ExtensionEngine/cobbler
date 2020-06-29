import AddCourse from '../views/Lecturer/AddCourse';
import AdminDashboard from '../views/Admin/Dashboard';
import EditCourse from '../views/Lecturer/EditCourse';
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
    meta: {
      protectedRoute: true
    },
    children: [{
      path: paths.lecturer.base,
      name: 'Lecturer dashboard',
      component: LecturerDashboard,
      meta: {
        lecturerRoute: true
      }
    }, {
      path: paths.lecturer.addCourse,
      name: 'Add course',
      component: AddCourse,
      meta: {
        roles: ['ADMIN']
      }
    }, {
      path: paths.lecturer.editCourse(':id'),
      name: 'Edit course',
      component: EditCourse,
      meta: {
        lecturerRoute: true
      }
    }, {
      path: paths.learner.base,
      name: 'Learner dashboard',
      component: LearnerDashboard,
      meta: {
        learnerRoute: true
      }
    }, {
      path: paths.admin.base,
      name: 'Admin dashboard',
      component: AdminDashboard,
      meta: {
        adminRoute: true
      }
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
  const isLecturerRoute = to.matched.some(it => it.meta.lecturerRoute);
  const isLearnerRoute = to.matched.some(it => it.meta.learnerRoute);
  const isAdminRoute = to.matched.some(it => it.meta.adminRoute);
  const isUserLoggedIn = !!store.state.auth.token;

  if ((isLecturerRoute && store.state.auth.role !== 'LECTURER') ||
    (isLearnerRoute && store.state.auth.role !== 'LEARNER') ||
    (isAdminRoute && store.state.auth.role !== 'ADMIN') ||
    (isLoginRoute && isUserLoggedIn) ||
    (isProtectedRoute && !isUserLoggedIn) ||
    to.fullPath === '/') {
    next(getBasePath());
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
