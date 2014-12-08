var users = require('../data/users'),
    encryption = require('../utilities/encryption');

module.exports = {
    getAll: function(req, res) {
        users.getAll(function(err, collection) {
            if (err) {
                return res.status(400).send({
                    message: 'Couldn\'t get users.'
                });
            }
            res.send(collection);
        });
    },
    getById: function(req, res) {
        var id = req.param('id');

        users.getById(id, function(err, user) {
            if (err) {
                return res.status(404).send({
                    message: 'User with this id does not exist.'
                });
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
                return res.status(400).send({
                    message: 'User with this username already exists.'
                });
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({
                        message: err.toString()
                    });
                }
                res.send(user);
            });
        });
    },
    update: function(req, res, next) {
        if (req.user._id == req.body._id) {
            var updatedUserData = req.body;

            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            users.update(req.body._id, updatedUserData, function() {
                res.end();
            });
        } else {
            res.status(401).send({
                message: 'You do not have permissions!'
            });
        }
    }
};