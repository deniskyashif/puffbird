var users = require('../data/users'),
  encryption = require('../utilities/encryption'),
  Promise = require('bluebird');

Promise.promisifyAll(users);

module.exports = {
  getAll: function(req, res) {
    users.getAll()
      .then(function(collection) {
        res.send(collection);
      }, function() {
        res.status(400).send({
          message: 'Couldn\'t get users.'
        });
      });
  },
  getById: function(req, res) {
    var id = req.param('id');

    if (!id) {
      res.status(400);
      return;
    }

    users.getById(id)
      .then(function(user) {
        res.send(user);
      }, function(err) {
        res.status(404).send({
          message: 'User with this id does not exist.'
        });
      });
  },
  create: function(req, res, next) {
    var newUserData = req.body;
    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

    users.create(newUserData)
      .then(function(user) {
        req.logIn(user, function(err) {
          if (err) {
            res.status(400);
            return res.send({
                message: err.toString()
            });
          }
          res.send(user);
        });
      }, function(err) {
        console.log(err);
        res.status(400).send({
          message: 'User with this username already exists.'
        });
      });
    },
    update: function(req, res, next) {
      var id = req.param('id');

      if (!id) {
        res.status(400);
        return;
      }

      if (req.user._id == id) {
        var updatedUserData = req.body;

        if (updatedUserData.password && updatedUserData.password.length > 0) {
          updatedUserData.salt = encryption.generateSalt();
          updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        }

        users.update(req.body._id, updatedUserData)
          .then(function(user) {
            res.status(200).send(user);
          }, function(err) {
            return res.status(400).send({
              message: 'Couldn\'t update user.'
            });
          });
      } else {
        res.status(401).send({
          message: 'You do not have permissions!'
        });
      }
    }
};