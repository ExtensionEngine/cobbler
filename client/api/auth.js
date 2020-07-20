import thwack, { endpoints, flattenData } from '.';

export function login(credentials) {
  return thwack.post(endpoints.auth.login, credentials)
    .then(flattenData);
}
