import thwack, { endpoints, flattenData } from '.';

export function subscribe() {
  return thwack.get(endpoints.sse.subscribe);
}

export function addPost(post) {
  return thwack.post(endpoints.sse.base, post)
    .then(flattenData);
}
