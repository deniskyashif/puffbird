var fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  _ = require('underscore'),
  decorationLine = '---------------------------------------';

module.exports = {
  generateTxt: function(data) {
    var file = path.resolve(__dirname + "/../tmp/" + data.user._id + '.txt'),
      text = 'Report ' + data.user.firstName + ' ' + data.user.lastName + '\n' + decorationLine + '\n';

    var groupedNotes = _.groupBy(data.notes, 'dueDate');
    _.sortBy(Object.keys(groupedNotes), 'dueDate').forEach(function(key) {
      var date = new Date(key);
      text += (date.toLocaleDateString()) + '\n';

      groupedNotes[key].forEach(function(note) {
        text += (note.title + '\n');
        text += ((note.details || '') + '\n');
      });
    });

    return new Promise(function(resolve, reject) {
      fs.writeFile(file, text, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(file);
      });
    });
  }
};