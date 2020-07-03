import { endpoints } from './common';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(endpoints.course.all(queryString));
}

export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}

export function enroll(id) {
  return thwack.post(endpoints.course.enroll(id));
}

export function checkIfEnrolled(id) {
  return thwack.get(endpoints.course.checkIfEnrolled(id));
}

export function searchName(text) {
  return thwack.get(endpoints.course.textSearch(text));
}
