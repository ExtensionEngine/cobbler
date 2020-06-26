import { getAllCourses } from '../../../api/courses';

export const getCourses = ({ commit }) => {
  return getAllCourses()
  .then(({ data }) => {
    return commit('setCourses', { courses: data });
  });
};
