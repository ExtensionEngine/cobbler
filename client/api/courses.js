import { endpoints } from './common';
import thwack from 'thwack';

export function addCourse(data) {
  return thwack.post(endpoints.courses.base, data);
}

export function getMyCourses() {
  return thwack.get(endpoints.courses.myCourses);
}
