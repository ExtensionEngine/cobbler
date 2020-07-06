'use strict';

function login({ user }, res) {
  const token = user.generateJWT();
  res.json({ data: token });
}

module.exports = {
  login
};
