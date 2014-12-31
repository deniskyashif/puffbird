var usersController = require('../controllers/UserController'),
	notesController = require('../controllers/NoteController');

module.exports = {
    users: usersController,
    notes: notesController
};