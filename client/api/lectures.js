import thwack, { endpoints, flattenData } from '.';

export function addLecture(data) {
  return thwack.post(endpoints.lectures.base, data)
  .then(flattenData);
}

export function getLecture(id) {
  return thwack.get(endpoints.lectures.getById(id))
  .then(flattenData);
}
