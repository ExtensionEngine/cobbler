'use strict';

const { ExtractJwt, Strategy } = require('passport-jwt');
const { BadCredentialsError } = require('../error');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../../user/user.model');

const options = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(options,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email }, rejectOnEmpty: true });
      const isValid = await user.checkPassword(password);
      if (isValid) return done(null, user);
      throw new BadCredentialsError('Wrong password');
    } catch (e) {
      return done(e);
    }
  }
));

// JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(opts, (payload, done) => {
  User.findOne({ email: payload.sub })
    .then(user => done(null, user || false))
    .catch(err => done(err, false));
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
  authenticate(strategy, options, cb) {
    return passport
      .authenticate(strategy, { ...options, failWithError: true }, cb);
  }
};
