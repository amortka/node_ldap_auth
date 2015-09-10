var passport = require('passport');
var express = require('express');
var authSvc   = require('../auth-svc');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    message: 'hello world!'
  });
});

router.get('/status', authSvc, function(req, res, next) {
  res.json({
    message: 'status: 200 OK',
    user: req.user
  });
});

router.get('/session', authSvc, function(req, res, next) {
  res.json({
    session: req.session,
    expire: req.session.cookie.maxAge / 1000
  });
});

module.exports = router;
