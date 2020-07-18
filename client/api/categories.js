import { endpoints } from './common';
import thwack from 'thwack';

export function getAll() {
  return thwack.get(endpoints.categories.base);
}
