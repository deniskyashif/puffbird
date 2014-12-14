var Note = require('mongoose').model('Note'),
    Promise = require('bluebird');

module.exports = {
    getAll: function(userId) {
        return new Promise(function(resolve, reject) {
            Note.find({
                user: userId
            }).exec(function(err, collection) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(collection);
            });
        });
    },
    getById: function(id, userId) {
        return new Promise(function(resolve, reject) {
            Note.findOne({
                _id: id,
                user: userId
            }).exec(function(err, note) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(note);
            });
        });
    },
    create: function(note) {
        return new Promise(function(resolve, reject) {
            Note.create(note, function(err, note) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(note);
            });
        });
    },
    update: function(id, userId, updatedNoteData) {
        return new Promise(function(resolve, reject) {
            Note.update({
                _id: id,
                user: userId,
            }, updatedNoteData).exec(function(err, note) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(note);
            });
        });
    },
    remove: function(id, userId) {
        return new Promise(function(resolve, reject) {
            Note.remove({
                _id: id,
                user: userId
            }).exec(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
};