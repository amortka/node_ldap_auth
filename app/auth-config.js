var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ldap = require('ldapjs');

var ldapConfig = {
  server: {
    url: '***'
  },
  base: '***',
  search: {
    filter: '(mail={{username}})',
    attributes: ['displayName', 'givenName', 'mail', 'sn', 'userPrincipalName', 'sAMAccountName'],
    scope: 'sub'
  },
  uidTag: 'cn',
  usernameField: 'username',
  passwordField: 'password'
};

passport.use('local', new LocalStrategy(
  function(username, password, done) {
    var client = ldap.createClient(ldapConfig.server);

    client.bind(username, password, function(err) {
      if (err) {
        return done('auth failed');
      }

      ldapConfig.search.filter = ldapConfig.search.filter.replace(/{{username}}/g, username);
      client.search(ldapConfig.base, ldapConfig.search, function(err, res) {
        if (err) {
          return done('user not found');
        }
        var items = [];

        res.on('searchEntry', function(entry) {
          items.push(entry.object);
        });

        res.on('error', function(err) {
          return done(err);
        });

        res.on('end', function(result) {
          if (items.length === 1) {
            return done(null, items[0]);
          } else {
            return done('to many users found.');
          }
        });

      });
    });

  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
