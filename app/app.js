var express = require('express');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 8080;

require('./auth-config');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'shhhItsasecret!1337',
  cookie: {
    maxAge: 10000
  },
  rolling: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/routes'));

app.listen(port);
console.log('app started @', port);
