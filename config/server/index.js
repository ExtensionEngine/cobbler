'use strict';

const port = resolvePort();

function resolvePort() {
  return process.env.PORT || 3000;
}

module.exports = {
  port
};
