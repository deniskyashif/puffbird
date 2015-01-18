var notes = require('../data/notes');

module.exports = {
	getAll: function(req, res) {
		var userId = req.user._id;

		notes.getAll(userId)
			.then(function(collection) {
				res.send(collection);
			}, function(err) {
				res.status(400).send({
					message: 'Notes could not be loaded.'
				});
			});
	},
	getById: function(req, res) {
		var id = req.param('id'),
			userId = req.user._id;

		if (!id) {
			res.status(400);
			return;
		}

		notes.getById(id, userId)
			.then(function(note) {
				res.send(note);
			}, function(err) {
				res.status(404).send({
					message: 'Note with this id does not exist or either does not belong to current user.'
				});
			});
	},
	create: function(req, res) {
		var newNoteData = req.body;
		newNoteData.user = req.user._id;

		notes.create(newNoteData)
			.then(function(note) {
				res.send(note);
			}, function(err) {
				console.log(err);
				res.status(400).send({
					message: 'Note could not be created.'
				});
			});
	},
	update: function(req, res) {
		var userId = req.user._id,
			id = req.param('id'),
			updatedNoteData = req.body;

		if (!(id && updatedNoteData)) {
			res.status(400);
			return;
		}

		updatedNoteData.modyfiedOn = new Date();

		notes.update(id, userId, updatedNoteData)
			.then(function(note) {
				res.status(200).end();
			}, function(err) {
				res.status(400).send({
					message: 'Couldn not update note.'
				});
			});
	},
	remove: function(req, res) {
		var id = req.param('id'),
			userId = req.user._id;

		if (!id) {
			res.status(400);
			return;
		}

		notes.remove(id, userId)
			.then(function() {
				res.status(200).end();
			}, function(err) {
				res.status(400).send({
					message: 'Couldn not delete note'
				});
			});
	}
};