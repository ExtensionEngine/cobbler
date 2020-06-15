// import axios from 'axios';
// import { endpoints } from './common';

export function login(credentials) {
  // TODO: connect to real backend at some point
  // return axios.post(endpoints.user.login, credentials);
  return Promise.resolve({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' });
}
