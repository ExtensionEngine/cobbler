import { endpoints } from './common';
import thwack from 'thwack';

export function addLecture(data) {
  return thwack.post(endpoints.lectures.base, data);
}
