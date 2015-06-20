var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {
        next(err);
      }
      if (!user) {
        res.send({
          success: false
        });
      }

      req.logIn(user, function(err) {
        if (err) {
          next(err);
        } else {
          res.send({
            success: true,
            user: user
          });
        }
      });
    });

    auth(req, res, next);
  },
  logout: function(req, res, next) {
    req.logout();
    res.end();
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
};