'use strict';

const port = resolvePort();
const roles = ['ADMIN', 'LECTURER', 'LEARNER'];

module.exports = {
  port,
  roles
};

function resolvePort() {
  return process.env.PORT || 3000;
}
