import { endpoints } from './common';
import thwack from 'thwack';

export function login(credentials) {
  return thwack.post(endpoints.user.login, credentials);
}
