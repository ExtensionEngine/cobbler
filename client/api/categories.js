import { endpoints } from './common';
import thwack from 'thwack';

export function get() {
  return thwack.get(endpoints.categories.base);
}
