import thwack, { endpoints } from '.';

export function getAllCategories() {
  return thwack.get(endpoints.categories.base);
}
