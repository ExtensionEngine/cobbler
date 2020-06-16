'use strict';

const { BAD_GATEWAY, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } = require('http-status-codes');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { HttpError } = require('../error');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../../user/user.model');

const options = {
  usernameField: 'email'
};

passport.use(new LocalStrategy(options,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return done(new HttpError('User not found', NOT_FOUND));
      const isValid = await user.checkPassword(password);
      if (isValid) return done(null, user);
      return done(new HttpError('Bad credentials', UNAUTHORIZED));
    } catch (e) {
      return done(new HttpError('Something went wrong', INTERNAL_SERVER_ERROR));
    }
  }
));

// JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(opts, (payload, done) => {
  User.findOne({ email: payload.sub })
    .then(user => done(null, user || false));
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
  authenticate(strategy) {
    return passport
      .authenticate(strategy, { ...options, failWithError: true });
  }
};
