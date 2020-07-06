import { endpoints } from './common';
import thwack from 'thwack';

export function get() {
  return thwack.get(endpoints.course.available);
}

export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}

export function checkIfEnrolled(id) {
  return thwack.get(endpoints.course.checkIfEnrolled(id));
}
