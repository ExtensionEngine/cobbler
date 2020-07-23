import { endpoints } from '.';
import thwack from 'thwack';

export function enroll(courseId) {
  return thwack.post(endpoints.enroll.base, { courseId });
}
