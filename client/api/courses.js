import { endpoints } from './common';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(`${endpoints.course.base}?${queryString}`);
}

export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}
