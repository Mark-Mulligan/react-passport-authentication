const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) done(null, user);
          else done(null, false);
        })
      })
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  })

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    })
  })
}