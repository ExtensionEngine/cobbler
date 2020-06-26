import { endpoints } from './common';
import thwack from 'thwack';

export function getAllCourses() {
  return thwack.get(endpoints.course.available);
}

export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}

export function enroll(id) {
  return thwack.post(endpoints.course.enroll(id));
}
