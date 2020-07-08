export default {
  base: '',
  login: '/login',
  forbidden: '/403',
  lecturer: {
    base: '/lecturer',
    addCourse: '/lecturer/add-course',
    editCourse: id => `/lecturer/edit-course/${id}`,
    editLecture: id => `/lecturer/edit-lecture/${id}`
  },
  learner: {
    base: '/'
  },
  admin: {
    base: '/admin'
  }
};
