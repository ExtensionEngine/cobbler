import { endpoints, flattenData } from '.';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(`${endpoints.course.base}?${queryString}`);
}
export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}
export function addCourse(data) {
  return thwack.post(endpoints.course.base, data)
    .then(flattenData);
}
export function getMyCourses() {
  return thwack.get(endpoints.course.myCourses)
    .then(flattenData);
}
export function getByName(name) {
  return thwack.get(endpoints.course.getByName(name))
    .then(flattenData);
}
