var Feedback = require('mongoose').model('Feedback'),
  Promise = require('bluebird');

module.exports = {
  getAll: function(userId) {
    return new Promise(function(resolve, reject) {
      Feedback.find({}).exec(function(err, collection) {
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
      Feedback.findOne({
        _id: id
      }).exec(function(err, feedback) {
        if (err) {
          reject(err);
        } else {
          resolve(feedback);
        }
      });
    });
  },
  create: function(feedback) {
    return new Promise(function(resolve, reject) {
      Feedback.create(feedback, function(err, feedback) {
        if (err) {
          reject(err);
        } else {
          resolve(feedback);
        }
      });
    });
  },
  remove: function(id, userId) {
    return new Promise(function(resolve, reject) {
      Feedback.remove({
        _id: id
      }).exec(function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};