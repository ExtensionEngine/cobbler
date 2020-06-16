import axios from 'axios';
import { endpoints } from './common';

export function login(credentials) {
  return axios.post(endpoints.user.login, credentials);
}
