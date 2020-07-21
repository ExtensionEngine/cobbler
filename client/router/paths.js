export default {
  base: '',
  login: '/login',
  forbidden: '/403',
  lecturer: {
    base: '/lecturer',
    addCourse: '/lecturer/add-course',
    editCourse: '/lecturer/edit-course/:id'
  },
  learner: {
    base: '/'
  },
  admin: {
    base: '/admin'
  }
};
