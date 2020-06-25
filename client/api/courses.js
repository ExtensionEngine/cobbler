import { endpoints } from './common';
import thwack from 'thwack';

export function getAllCourses() {
  return thwack.get(endpoints.course.getAvailable);
}

export function getById(id) {
  return thwack.get(`${endpoints.course.getById}${id}`);
}
