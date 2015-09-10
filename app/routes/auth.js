var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.status(401).json({
    message: 'POST credentials to /login'
  });
});

router.get('/loginfailed', function(req, res, next) {
  res.status(403).json({
    message: 'failed to login'
  });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.json({
    message: 'successfully logged out'
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/status',
  failureRedirect: '/api/loginfailed'
}));

module.exports = router;
