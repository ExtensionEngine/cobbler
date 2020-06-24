import compareAsc from 'date-fns/compareAsc';

export const getEnrolledCourses = (state, getters, { auth }) => {
  return state.courses.data.filter(course => (course.Users.find(user => user.email === auth.email)));
};
export const getNotEnrolledCourses = (state, getters, { auth }) => {
  return state.courses.data
    .filter(course => !(course.Users.find(user => user.email === auth.email)))
    .sort((prev, next) => {
      return compareAsc(prev.updatedAt, next.updatedAt);
    });
};
