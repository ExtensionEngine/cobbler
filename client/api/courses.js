import { endpoints } from './common';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(`${endpoints.course.base}?${queryString}`);
}
export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}
export function addCourse(data) {
  return thwack.post(endpoints.courses.base, data)
    .then(flattenData);
}
export function getMyCourses() {
  return thwack.get(endpoints.courses.myCourses)
    .then(flattenData);
}
export function getByName(name) {
  return thwack.get(endpoints.courses.getByName(name))
    .then(flattenData);
}
