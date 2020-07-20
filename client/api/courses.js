import thwack, { endpoints, flattenData } from '.';

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
