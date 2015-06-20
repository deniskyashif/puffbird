var feedback = require('../data/feedback');

module.exports = {
  getAll: function(req, res) {
    feedback.getAll()
      .then(function(collection) {
        res.send(collection);
      }, function() {
        res.status(400).send({
          message: 'Couldn\'t get feedback.'
        });
      });
  },
  getById: function(req, res) {
    var id = req.param('id');

    if (!id) {
      res.status(400);
      return;
    }

    feedback.getById(id)
      .then(function(feedback) {
        res.send(feedback);
      }, function(err) {
        res.status(404).send({
          message: 'User with this id does not exist.'
        });
      });
  },
  create: function(req, res, next) {
    var newFeedbackData = req.body;

    feedback.create(newFeedbackData)
      .then(function(feedback) {
        res.send(feedback);
      }, function(err) {
        console.log(err);
        res.status(400).send({
          message: 'Couldn\'t create feedback.'
        });
      });
  },
  remove: function(req, res) {
    var id = req.param('id');

    if (!id) {
      res.status(400);
      return;
    }

    feedback.remove(id)
      .then(function() {
        res.status(200).end();
      }, function(err) {
        res.status(400).send({
          message: 'Could not delete feedback.'
        });
      });
  }
};