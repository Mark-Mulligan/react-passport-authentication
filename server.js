require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

const connectDB = require("./config/db");
const User = require("./models/User");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
 

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

connectDB();

app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exsists');
    else {
      req.login(user, error => {
        if (error) throw error;
        res.send('User logged in');
      })
    }
  })(req, res, next)
})

app.post("/register", (req, res) => {
  const { username, password } = req.body; 

  User.findOne({ username: username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User already exsits');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        password: hashedPassword
      })

      await newUser.save();
      res.send("User Created");
    }
  })
})

app.get("/user", (req, res) => {
  console.log('user route hit');
  console.log(req.isAuthenticated());
  res.send(req.user);
})

app.listen(4000, () => {
  console.log('Server has started')
})