var mongoose = require('mongoose'),
  User = require('../data/models/User'),
  Note = require('../data/models/Note'),
  Note = require('../data/models/Feedback');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.once('open', function(err) {
    if (err) {
      console.log('Database could not be opened: ' + err);
      return;
    }
    console.log('Database up and running...');
  });

  db.on('error', function(err) {
    console.log('Database error: ' + err);
  });

  User.seedInitialUsers();
};