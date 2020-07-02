import thwack, { endpoints } from '.';

export function login(credentials) {
  return thwack.post(endpoints.auth.login, credentials);
}
