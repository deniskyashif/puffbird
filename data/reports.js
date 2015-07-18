var fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  _ = require('underscore');

var decorationLine = '---------------------------------------';

module.exports = {
  generateTxt: function(data) {
    var dir = __dirname + '/../temp/',
      file = path.resolve(dir + data.user._id + '.txt'),
      text = 'Report ' + (data.user.firstName || '') + ' ' + (data.user.lastName || '') + '\n' + decorationLine + '\n';



    var groupedNotes = _.groupBy(data.notes, 'dueDate');
    _.sortBy(Object.keys(groupedNotes), 'dueDate').forEach(function(key) {
      var date = new Date(key);
      text += (date.toLocaleDateString()) + '\n';

      text += groupedNotes[key]
        .map(function(note) {
          return (note.title + '\n') + ((note.details || '') + '\n');
        })
        .join('\n');
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