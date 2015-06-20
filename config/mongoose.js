var mongoose = require('mongoose'),
  User = require('../data/models/User'),
  Note = require('../data/models/Note'),
  Feedback = require('../data/models/Feedback');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.once('open', function(err) {
    if (err) {
      console.log('Database could not be opened: ' + err);
    }

    console.log('Database up and running on ' + config.db);
  });

  db.on('error', function(err) {
    console.log('Database error: ' + err);
  });

  User.seedInitialUsers();
};