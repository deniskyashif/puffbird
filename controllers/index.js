var usersController = require('../controllers/UsersController')
	, notesController = require('../controllers/NotesController')
  , feedbackController = require('../controllers/FeedbackController');

module.exports = {
    users: usersController,
    notes: notesController,
    feedback: feedbackController
};