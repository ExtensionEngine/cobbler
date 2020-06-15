'use strict';

const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../../user/user.model');

const options = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(options,
  (email, password, done) => User.findOne({ where: { email } })
  .then(user => {
    if (user && user.authenticate(password)) {
      return user;
    }
    return false;
  })
  .then(user => {
    return done(null, user || false);
  })
  .catch(err => {
    return done(err, false);
  })));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = {
  initialize(options = {}) {
    return passport.initialize(options);
  },
  authenticate(strategy, options = {}) {
    return passport
      .authenticate(strategy, { ...options });
  }
};
