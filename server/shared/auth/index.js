'use strict';

const { ExtractJwt, Strategy } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../../user/user.model');

const options = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(options,
  (email, password, done) => User.findOne({ where: { email } })
  .then(async user => {
    if (user && await user.authenticate(password)) {
      return done(null, user);
    }
    return done(null, false, { message: 'False username or password' });
  })
  .catch(err => {
    return done(err, false, { message: 'User not found' });
  }))
);
// JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(opts, (payload, done) => {
  User.findOne({ id: payload.id })
    .then(user => {
      return done(null, user || false);
    })
    .catch(err => {
      return done(err, false);
    });
}));

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
