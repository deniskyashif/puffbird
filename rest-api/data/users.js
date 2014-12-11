var User = require('mongoose').model('User'),
    Promise = require('bluebird');

module.exports = {
    getAll: function() {
        return new Promise(function(resolve, reject) {
            User.find({})
                .exec(function(err, collection) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(collection);
                });
        });
    },
    getById: function(id) {
        return new Promise(function(resolve, reject) {
            User.findById(id).exec(function(err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    },
    create: function(user) {
        return new Promise(function(resolve, reject) {
            User.create(user, function(err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
        });
    },
    update: function(id, updatedUserData) {
        return new Promise(function(resolve, reject) {
            User.update({
                    _id: id
                }, updatedUserData)
                .exec(function(err, user) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(user);
                });
        });
    }
};