import { endpoints } from './common';
import thwack from 'thwack';

export function getAllCategories() {
  return thwack.get(endpoints.categories.base);
}
