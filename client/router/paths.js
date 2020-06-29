export default {
  base: '',
  login: '/login',
  lecturer: {
    base: '/lecturer',
    addCourse: '/lecturer/add-course',
    editCourse: id => `/lecturer/edit-course/${id}`
  },
  learner: {
    base: '/learner'
  },
  admin: {
    base: '/admin'
  }
};
