const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');

const app = express();

const secret = 'mysecretsshhh';
const adminSecretKey = 'mumble'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home', function(req, res) {
  // assigning mocks since middleware here would be problematic on showing prev vulnerabilities
  const isAdmin = false
  const email = 'user@mail.com'

  const userStatus = isAdmin ? 'admininistrator' : 'user'
  const body = `
    <p>Welcome, dear ${userStatus} </p>
    <p>With email <b>${email}</b> </p>
  `

  console.log("body", body)
  res.send({ body });
});

app.get('/api/secret', withAuth, function(req, res) {
  const adminKey = req.email.split('_')[0]

  if(adminKey === adminSecretKey) {
    res.send("Welcome, dear administrator. Company's high-level master key is $2b$10$BUk6vSyeFaDFtnuNc/39jOskkXM/AlEWQ5XpJjQN869yNWpzZ2NWS");
  } else {
    res.send("Welcome, dear user. Company's low-level key is potato");
  }
});

app.post('/api/register', function(req, res) {
  const { adminKey } = req.body;
  let { email, password } = req.body
  let isAdmin = false

  if (adminKey === adminSecretKey) {
    email = `${adminSecretKey}_${email}`
    password = `${adminSecretKey}_${password}`
    isAdmin = true
  }
  const user = new User({ email, password, isAdmin });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { isAdmin } = req.body;
  let { email, password } = req.body;

  if (isAdmin) {
    email = `${adminSecretKey}_${email}`
    password = `${adminSecretKey}_${password}`
  }

  console.log('isAdmin', isAdmin)
  console.log('email', email)
  console.log('password', password)

  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email, password or you are not admin'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {
          res.cookie('login', req.body, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);