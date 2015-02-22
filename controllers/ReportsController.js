var reports = require('../data/reports'),
  path = require('path');

module.exports = {
  get: function(req, res) {
    var options = {
      root: path.resolve(__dirname + '/../tmp/'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    },
    fileName = req.params.name; 

    res.sendFile(fileName, options, function(err) {
      if (err) {
        res.status(err.status).end();
      }
    });
  },
  create: function(req, res) {
    var data = {
      notes: req.body,
      user: req.user
    };

    reports.generateTxt(data).then(function(file) {
      var fileUrl = req.protocol + '://' + req.get('host') + '/report/' + path.basename(file);
      res.send(fileUrl);
    }, function(err) {
      console.log(err);
      res.status(err.status).send({
        message: 'Could not create report.'
      });
    });
  }
};