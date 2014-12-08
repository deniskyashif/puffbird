var notes = require('../data/notes');

module.exports = {
	getAll: function(req, res) {
		var userId = req.user._id;

		notes.getAll(userId, function(err, collection) {
			if (err) {
				console.log('Notes could not be loaded: ' + err);
			}
			res.send(collection);
		});
	},
	getById: function(req, res) {
		var id = req.param('id'),
			userId = req.user._id;

		notes.getById(id, userId, function(err, note) {
            if (err) {
                res.status(404).send('User with this id does not exist');
                return;
            }
            res.send(note);
        });
	},
	create: function(req, res) {
		var newNoteData = req.body;
        newNoteData.user = req.user._id;

        notes.create(newNoteData, function(err, user) {
            if (err) {
                return;
            }
            res.send(user);
        });
	},
	update: function(req, res) {
		
	},
	delete: function(req, res) {

	}
};