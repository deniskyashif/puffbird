var users = require('../data/users'),
    encryption = require('../utilities/encryption');

var CONTROLLER_NAME = 'users';

module.exports = {
    getAll: function(req, res) {
        users.getAll(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }
            res.send(collection);
        });
    },
    getById: function(req, res) {
        var id = req.param('id');

        users.getById(id, function(err, user) {
            if (err) {
                res.status(404).send('User with this id does not exist');
                return;
            }
            res.send(user);
        });
    },
    create: function(req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        users.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({
                        reason: err.toString()
                    });
                }
                res.send(user);
            });
        });
    },
    update: function(req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;

            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            users.update(req.body._id, updatedUserData, function() {
                res.end();
            });
        } else {
            res.send({
                reason: 'You do not have permissions!'
            });
        }
    }
};