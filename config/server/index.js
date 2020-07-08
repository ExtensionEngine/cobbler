'use strict';

const port = resolvePort();
const roles = ['ADMIN', 'LECTURER', 'LEARNER'];
const teachingElements = ['TEXT', 'IMAGE', 'VIDEO'];

module.exports = {
  port,
  roles,
  teachingElements
};

function resolvePort() {
  return process.env.PORT || 3000;
}
