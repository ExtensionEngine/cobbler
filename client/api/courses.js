import thwack, { endpoints, flattenData } from '.';

export function addCourse(data) {
  return thwack.post(endpoints.courses.base, data)
  .then(flattenData);
}

export function getMyCourses() {
  return thwack.get(endpoints.courses.myCourses)
  .then(flattenData);
}

export function checkNameAvailability(name) {
  return thwack.post(endpoints.courses.checkNameAvailability, { name })
  .then(flattenData);
}
