import { endpoints } from './common';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(endpoints.course.custom(queryString));
}

export function getById(id) {
  return thwack.get(endpoints.course.byId(id));
}

export function searchName(text) {
  return thwack.get(endpoints.course.textSearch(text));
}
