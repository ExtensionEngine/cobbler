import thwack, { endpoints, flattenData } from '.';

export function getAllCategories() {
  return thwack.get(endpoints.categories.base)
  .then(flattenData);
}
