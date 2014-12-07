var Note = require('mongoose').model('Note');

module.exports = {
    getAll: function(userId, callback) {
        Note.find({
            user: userId
        }).exec(callback);
    },
    getById: function(id, userId, callback) {
        Note.findOne({
            _id: id,
            user: userId
        }).exec(callback);
    },
    create: function(note, callback) {
        Note.create(note, callback);
    },
    update: function(id, userId, updatedNoteData, callback) {
        Note.update({
            _id: id,
            user: userId,
        }, updatedNoteData).exec(callback);
    },
    delete: function(id, userId, callback){
        Note.remove({
            _id: id,
            user: userId,
        }).exec(callback);
    }
};