import compareAsc from 'date-fns/compareAsc';
import parseISO from 'date-fns/parseISO';

export const getEnrolledCourses = (state, getters, { auth }) => {
  return state.courses.data.filter(course => (course.Users.find(user => user.email === auth.email)));
};
export const getNotEnrolledCourses = (state, getters, { auth }) => {
  return state.courses.data
    .filter(course => !(course.Users.find(user => user.email === auth.email)))
    .sort((prev, next) => {
      return compareAsc(parseISO(prev.updatedAt), parseISO(next.updatedAt));
    });
};
