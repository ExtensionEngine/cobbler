'use strict';

function login({ user }, res) {
  const token = user.generateJWT();
  res.json({ token });
}

module.exports = {
  login
};
