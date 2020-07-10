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
    .then(flattenData);
}

export function getCourse(id) {
  return thwack.get(endpoints.courses.getById(id))
    .then(flattenData);
}

export function updateCourse(course) {
  return thwack.patch(endpoints.courses.update(course.id), course)
  .then(flattenData);
}
