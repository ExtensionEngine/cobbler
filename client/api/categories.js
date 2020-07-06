import { endpoints } from './common';
import thwack from 'thwack';

export function get(queryString) {
  return thwack.get(endpoints.categories.base);
}
